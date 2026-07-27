"""Pydantic models for request/response validation."""

from pydantic import BaseModel, EmailStr


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactResponse(BaseModel):
    status: str
    detail: str


class TerminalCommand(BaseModel):
    command: str


class TerminalOutput(BaseModel):
    output: str


class Stats(BaseModel):
    visits: int
    messages: int
    uptime_seconds: int
    server_time: str
