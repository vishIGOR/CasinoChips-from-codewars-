from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import Integer, String, Column, ForeignKey, DateTime, MetaData, update, exc
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from pydantic import BaseModel

DB_URL = "postgresql+asyncpg://postgres:postgres@db:5432/foo"
DB_NAMING_CONVENTION = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
DB_KWARGS = {'echo': True}

engine = create_async_engine(DB_URL, **DB_KWARGS)
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
metadata = MetaData(naming_convention=DB_NAMING_CONVENTION, bind=engine)
Base = declarative_base(metadata=metadata)


async def get_db() -> SessionLocal:
    session = SessionLocal()
    async with session as db:
        try:
            yield db
        finally:
            db.close()


class Result(Base):
    __tablename__ = "results"
    id = Column(Integer(), primary_key=True, autoincrement=True)
    first = Column(Integer(), nullable=False)
    second = Column(Integer(), nullable=False)
    third = Column(Integer(), nullable=False)
    result = Column(Integer(), nullable=False)

    __mapper_args__ = {"eager_defaults": True}


class ResultDto(BaseModel):
    first: int
    second: int
    third: int
    result: int


app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await start_db()


async def start_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.get("/ping")
async def pong():
    return {"ping": "pong!"}


@app.post("/isResultExists", response_model=bool)
async def is_result_exists(result_dto: ResultDto, db: AsyncSession = Depends(get_db)):
    try:
        results = (await db.execute(
            select(Result).where(Result.result == result_dto.result, Result.first == result_dto.first,
                                 Result.second == result_dto.second, Result.third == result_dto.third))).scalars().one()
    except exc.NoResultFound:
        return False
    except exc.MultipleResultsFound:
        return True
    return True


@app.post("/putResult")
async def put_result(result_dto: ResultDto, db: AsyncSession = Depends(get_db)):
    new_result = Result(first=result_dto.first, second=result_dto.second, third=result_dto.third,
                        result=result_dto.result)
    try:
        db.add(new_result)
        await db.commit()
    except:
        raise HTTPException(status_code=500, detail="unexpected server error")
