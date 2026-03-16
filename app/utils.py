"""Utility helpers."""


def format_currency(value: float) -> str:
    """Format a number as USD currency string."""
    return f"${value:,.2f}"


def format_pct(value: float) -> str:
    """Format a number as a percentage with sign."""
    sign = "+" if value >= 0 else ""
    return f"{sign}{value:.1f}%"
