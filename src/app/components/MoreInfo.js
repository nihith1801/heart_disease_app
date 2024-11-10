// components/MoreInfo.js
export const MoreInfo = () => {
    return (
      <div className="text-white px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Exploratory Data Analysis (EDA) and Predictive Analysis</h2>
        <p className="mb-4">
          Exploratory Data Analysis (EDA) helps us understand the underlying patterns, structures, and relationships within
          the data. This process includes visualizing distributions, identifying missing values, and detecting outliers.
          In the context of heart disease, EDA reveals critical trends such as age, cholesterol levels, and resting blood pressure that correlate with heart disease occurrences.
        </p>
        <p className="mb-4">
          After EDA, Predictive Analysis utilizes various machine learning models to forecast the likelihood of heart disease
          based on multiple factors. By training algorithms on historical data, the models learn to predict the risk for new patients,
          aiding in early intervention and treatment planning.
        </p>
      </div>
    );
  };
