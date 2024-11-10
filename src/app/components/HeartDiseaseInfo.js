"use client";
import React, { forwardRef } from "react";
import { TextScrambleEffect } from "./TextScrambleEffect";
import { LinkPreview } from "./LinkPreview";

export const HeartDiseaseInfo = forwardRef((props, ref) => {
    const phrases = [
        "Heart Disease Overview",
        "Risk Analysis",
        "Predictive Models",
        "Data Insights"
    ];

    return (
        <div ref={ref} className="w-full md:max-w-none flex flex-col justify-center space-y-6 p-6">
            <TextScrambleEffect phrases={phrases} pauseTime={2000} />

            {/* Overview */}
            <p className="text-white w-full">
                Heart disease remains the leading cause of death globally. Understanding its types, symptoms, and risk factors is crucial for prevention and early intervention.
            </p>

            {/* Key Information */}
            <div className="w-full">
                <h2 className="text-xl font-bold text-white">Essential Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Common Types</h3>
                        <ul className="list-disc list-inside text-white">
                            <li>Coronary Artery Disease</li>
                            <li>Arrhythmias</li>
                            <li>Heart Valve Disease</li>
                            <li>Heart Failure</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Key Risk Factors</h3>
                        <ul className="list-disc list-inside text-white">
                            <li>High blood pressure</li>
                            <li>High cholesterol</li>
                            <li>Smoking</li>
                            <li>Diabetes</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Analysis Tools */}
            <div className="w-full">
                <h2 className="text-xl font-bold text-white">Our Analysis Tools</h2>

                {/* EDA Section */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">Exploratory Data Analysis (EDA)</h3>
                    <p className="text-white">
                        Our EDA tool provides interactive visualizations of heart disease data:
                    </p>
                    <ul className="list-disc list-inside text-white">
                        <li>Distribution analysis of key risk factors</li>
                        <li>Correlation between different health parameters</li>
                        <li>Age and gender-based risk patterns</li>
                        <li>Demographic trends in heart disease</li>
                    </ul>
                </div>

                {/* Predictive Models */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">Predictive Models</h3>
                    <p className="text-white">
                        We employ multiple machine learning models for heart disease prediction:
                    </p>
                    <ul className="list-disc list-inside text-white">
                        <li><strong>Logistic Regression:</strong> Provides probability estimates of heart disease based on risk factors</li>
                        <li><strong>Support Vector Machine (SVM):</strong> Offers high-accuracy classification using non-linear relationships</li>
                        <li><strong>Random Forest:</strong> Ensemble model for robust prediction and feature importance analysis</li>
                    </ul>
                </div>

                {/* Model Performance */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">Model Performance</h3>
                    <ul className="list-disc list-inside text-white">
                        <li>Accuracy: 85-90% across models</li>
                        <li>Cross-validated results</li>
                        <li>Regular updates with new data</li>
                    </ul>
                </div>
            </div>

            {/* Navigation Links */}
            {/* Navigation Links */}
            <div className="w-full">
                <h2 className="text-xl font-bold text-white mb-4">Explore Our Tools</h2>
                <div className="flex flex-col space-y-6">
                    <div className="group">
                        <LinkPreview
                            url="/eda"
                            className="font-bold text-blue-500"
                            isInternalRoute={true}
                            previewImage="/images/eda.jpg"
                        >
                            Interactive Data Analysis & Visualization
                        </LinkPreview>
                        <p className="text-gray-300 text-sm mt-2">
                            Explore interactive visualizations of heart disease data patterns, risk factor distributions,
                            and demographic trends through our comprehensive data analysis dashboard.
                        </p>
                    </div>

                    <div className="group">
                        <LinkPreview
                            url="/predictive"
                            className="font-bold text-blue-500"
                            isInternalRoute={true}
                            previewImage="/images/predictive.jpg"
                        >
                            Risk Assessment & Prediction Tools
                        </LinkPreview>
                        <p className="text-gray-300 text-sm mt-2">
                            Access our advanced machine learning models to assess heart disease risk factors
                            and receive personalized risk assessments based on clinical parameters.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

HeartDiseaseInfo.displayName = 'HeartDiseaseInfo';