"""Small shared utilities."""


def format_table(rows: list[dict], columns: list[str]) -> str:
    """Render a list of dicts as a monospace ASCII table for the terminal app."""
    header_row = dict(zip(columns, columns))
    widths = [max(len(str(r[c])) for r in rows + [header_row]) for c in columns]

    header = " | ".join(c.ljust(w) for c, w in zip(columns, widths))
    sep = "-+-".join("-" * w for w in widths)
    lines = [header, sep]
    for r in rows:
        lines.append(" | ".join(str(r[c]).ljust(w) for c, w in zip(columns, widths)))
    return "\n".join(lines)
