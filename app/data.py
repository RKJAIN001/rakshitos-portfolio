"""
All portfolio content lives here. Edit this file to update the site —
the frontend pulls everything live from the API, nothing is hardcoded in HTML.
"""

PROFILE = {
    "name": "Rakshit Jain",
    "tagline": "turns raw data into decisions.",
    "location": "New Delhi, India",
    "email": "jainrakshit069@gmail.com",
    "phone": "+91 8595503788",
    "linkedin": "https://www.linkedin.com/in/rakshit-jain-565a2a281",
    "summary": (
        "B.Tech (EEE) student and data & business analyst based in New Delhi. "
        "I build dashboards, run the SQL/Python behind them, and translate the "
        "output into recommendations people actually act on. Across internships "
        "in product analytics, business consulting, and EV data, my throughline "
        "has stayed the same: validate the data, build the dashboard, then say "
        "plainly what it means for the decision at hand."
    ),
    "stats": [
        {"value": "5,000+", "label": "HCPs segmented in a pharma commercial dashboard"},
        {"value": "20+", "label": "Business guesstimates solved on pricing & demand"},
        {"value": "50+", "label": "SQL problems solved — LeetCode SQL 50 badge"},
        {"value": "10", "label": "Member team led as VP, Career Crafters"},
    ],
}

EXPERIENCE = [
    {
        "role": "Product Analyst Intern",
        "org": "Interviewkit.ai",
        "date": "Apr 2026 – Jun 2026",
        "points": [
            "Applied analytical problem-solving to business and product performance data in Excel — identifying trends, tracking KPIs, and delivering insights for marketing analytics and product decisions.",
            "Developed and monitored performance dashboards, evaluated growth metrics, and worked with cross-functional stakeholders to translate findings into improvement recommendations.",
        ],
    },
    {
        "role": "Consulting Analyst Fellow",
        "org": "CrackNonTech",
        "date": "Feb 2026 – Mar 2026",
        "points": [
            "Performed business analysis on real-world cases spanning market segmentation, market entry, pricing, and growth strategy using structured problem-solving frameworks.",
            "Ran SQL/Python analyses, solved 20+ pricing and demand guesstimates, and presented marketing analytics insights through business recommendations.",
        ],
    },
    {
        "role": "Data Analyst Intern",
        "org": "FLYT Micro Mobility Pvt. Ltd.",
        "date": "May 2025 – Jul 2025",
        "points": [
            "Collected, validated, and analyzed real-time EV sensor data to monitor performance, efficiency, and safety.",
            "Partnered with engineering stakeholders to organize operational datasets and surface performance trends that supported data-driven testing decisions.",
        ],
    },
]

PROJECTS = [
    {
        "name": "UrbanIQ AI",
        "subtitle": "business location intelligence",
        "description": "An end-to-end decision-support platform that scores, ranks, and compares business locations against a custom evaluation formula — combining interactive dashboards, geospatial analytics, and recommendations to support expansion decisions.",
        "tags": ["Python", "Streamlit", "SQLite", "Pandas", "Folium"],
        "github": "https://github.com/RKJAIN001/UrbanIQ-AI",
        "demo": "https://urbaniq-ai.streamlit.app/",
    },
    {
        "name": "AutoInsight",
        "subtitle": "automated EDA + LLM insights",
        "description": "An AI-powered analysis platform where users upload any dataset and instantly get automated cleaning, auto-generated visualizations, and natural-language insights — no manual EDA or coding required.",
        "tags": ["Python", "Streamlit", "Gemini API", "Pandas", "Plotly"],
        "github": "https://github.com/RKJAIN001/AutoInsight",
        "demo": "https://autoinsight-5nyuktpmn3lr77yv37gycr.streamlit.app/",
    },
    {
        "name": "Territory Optimization Dashboard",
        "subtitle": "pharma commercial analytics",
        "description": "A commercial dashboard segmenting 5,000+ HCPs by prescription volume and market share to optimize sales rep call planning, with dynamic DAX metrics tracking share-of-voice and territory penetration.",
        "tags": ["Power BI", "DAX", "Excel"],
        "github": None,
        "demo": "#",
    },
]

SKILLS = [
    {"category": "Programming", "items": ["Python", "SQL"]},
    {"category": "Data analysis", "items": ["Excel", "Power BI", "Data Visualization", "EDA", "Statistical Analysis", "Alteryx", "Business Analysis"]},
    {"category": "AI / ML", "items": ["NumPy", "Pandas", "Scikit-learn", "Machine Learning", "NLP", "Feature Engineering", "FastAPI"]},
]

EDUCATION = [
    {
        "degree": "B.Tech, Electrical & Electronics Engineering",
        "school": "Maharaja Agrasen Institute of Technology, New Delhi",
        "date": "2023 – 2027",
        "detail": "CGPA 7.37",
    },
    {
        "degree": "Senior Secondary (Grade XII), CBSE",
        "school": "Little Flowers Public Sr. Sec. School, New Delhi",
        "date": "2022 – 2023",
        "detail": None,
    },
    {
        "degree": "Secondary (Grade X), CBSE",
        "school": "Little Flowers International School, New Delhi",
        "date": "2020 – 2021",
        "detail": None,
    },
]

ACHIEVEMENTS = [
    "Samsung Innovation Campus (SIC) — AI & ML certification",
    "Internshala — Data Science Training Certification",
    "LeetCode SQL 50 badge — 50+ problems across joins, subqueries & aggregate functions",
]

LEADERSHIP = {
    "role": "Vice President, Career Crafters",
    "date": "Jul 2025 – Jul 2026",
    "detail": "Led a 10-member team, ran 10+ technical events (100+ attendees/session), coordinated faculty & external stakeholders.",
}
