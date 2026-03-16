"""SQLAlchemy models for persistence."""

from sqlalchemy import Column, String, Float, Text, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite:///ai_hedge_demo.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


class UserRecord(Base):
    __tablename__ = "users"

    user_id = Column(String, primary_key=True)
    portfolio_name = Column(String, nullable=True)
    initial_investment = Column(Float, default=0.0)
    current_value = Column(Float, default=0.0)
    state = Column(String, default="new")  # new | choosing | active | withdrawn
    history_json = Column(Text, default="[]")


def init_db():
    Base.metadata.create_all(bind=engine)
