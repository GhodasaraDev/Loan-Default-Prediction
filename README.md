# LoanGuard — AI Loan Default Prediction Platform

Enterprise credit risk assessment platform powered by **FastAPI**, **Scikit-learn**, and a **React 19 + Material UI** dark fintech interface.

---

## 🏛️ System Architecture

```
React Frontend (Vite + MUI 9 + Recharts)
         │  (HTTP requests on port 5173 -> 8000)
         ▼
FastAPI REST API Server (Port 8000)
         │  (Input Validation via Pydantic + Feature Scaling)
         ▼
Machine Learning Pipeline (loan_default_model.pkl + preprocessor.pkl)
         │  (Logistic Regression Model Inference)
         ▼
Risk Verdict + Default Probability + Underwriting Recommendation + Audit Trail
```

---

## 🚀 How to Run the Project

### Prerequisites
- **Python 3.10+**
- **Node.js 18+ & npm**

---

### Step 1: Start the Backend (FastAPI)

1. Open your terminal in the project root directory (`Loan_Default-ML_Project-main`):
   ```bash
   pip install -r backend/requirements.txt
   ```

2. Start the FastAPI server using `uvicorn`:
   ```bash
   uvicorn backend.main:app --reload --port 8000
   ```

   The backend will be running at:
   - **API Root**: `http://localhost:8000/`
   - **Interactive API Documentation (Swagger UI)**: `http://localhost:8000/docs`
   - **Model Metadata Endpoint**: `http://localhost:8000/api/model-info`

---

### Step 2: Start the Frontend (React + Vite)

1. Open a **second terminal** and navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies (if running for the first time):
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   - **`http://localhost:5173/`**

---

### Alternative: Standalone Streamlit Dashboard (Optional)

If you prefer to run the standalone Streamlit dashboard instead:
1. Ensure Streamlit dependencies are installed:
   ```bash
   pip install streamlit plotly reportlab
   ```
2. Run the Streamlit app:
   ```bash
   streamlit run streamlit_app.py
   ```

---

## 📋 Features & Capabilities

- **16-Feature Assessment Form**: Evaluates demographics, credit score, DTI ratio, and loan terms with quick presets ("Low Risk Sample", "High Risk Sample").
- **Live ML Probability Scoring**: Calculates continuous default probability and assigns Low, Medium, or High Risk tiers.
- **Factor Breakdown**: Identifies primary risk drivers (e.g., elevated DTI, subprime credit score).
- **Session History & Analytics**: LocalStorage audit log with interactive Recharts graphs and CSV export.
- **Dark Glassmorphic UI**: High-contrast, responsive fintech styling with Outfit & Inter typography.
- **REST API with Swagger Docs**: Clean OpenAPI specification at `/docs`.
