from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://postgres:postgres@db:5432/inventory"
    cors_origins: str = "*"

    class Config:
        env_file = ".env"


settings = Settings()
