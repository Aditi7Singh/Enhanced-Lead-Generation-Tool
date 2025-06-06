# Enhanced Lead Generation Tool

## Overview
This project is an enhanced lead generation tool designed to help businesses efficiently collect and manage potential customer information. The tool focuses on extracting valuable business leads from various sources while ensuring data quality and usability.

## Features
- Intelligent web scraping with anti-blocking measures
- Lead data enrichment and validation
- User-friendly interface for data management
- Export functionality for CRM integration
- Automated lead scoring and prioritization

## Technical Stack
- Python 3.9+
- FastAPI for backend API
- React for frontend interface
- PostgreSQL for data storage
- Selenium for web scraping
- BeautifulSoup4 for HTML parsing

## Setup Instructions

### Prerequisites
- Python 3.9 or higher
- Node.js 14+ and npm
- PostgreSQL 12+
- Chrome/Chromium browser (for web scraping)

### Backend Setup
1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database:
```bash
python scripts/init_db.py
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage
1. Start the backend server:
```bash
python main.py
```

2. Access the web interface at `http://localhost:3000`

3. Configure your scraping targets and parameters

4. Start the lead generation process

## Project Structure
```
├── backend/
│   ├── api/
│   ├── core/
│   ├── models/
│   └── utils/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── tests/
├── docs/
├── requirements.txt
└── README.md
```

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any questions or concerns, please open an issue in the GitHub repository. 