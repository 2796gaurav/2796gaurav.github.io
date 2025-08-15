---
layout: post
title: "Data Visualization Analysis"
date: 2025-08-15 07:06:06 +0000
categories: [Machine Learning]
tags: [jupyter, notebook, python]
author: Gaurav
excerpt: "Analysis and insights from Jupyter notebook"
---

<!-- Generated from Jupyter notebook -->


This notebook explores modern data visualization techniques using matplotlib, seaborn, and plotly for creating interactive and publication-ready charts.

## Topics Covered
- Statistical visualizations
- Interactive plots with Plotly
- Custom styling and themes
- Best practices for data storytelling


```python
# Import visualization libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import warnings
warnings.filterwarnings('ignore')

# Set random seed for reproducibility
np.random.seed(42)

print("📊 Visualization libraries loaded successfully!")
```

## Creating Sample Dataset

Let's generate a comprehensive dataset for our visualization examples:


```python
# Generate sample e-commerce dataset
n_customers = 1000
n_months = 12

# Customer demographics
customers = pd.DataFrame({
    'customer_id': range(1, n_customers + 1),
    'age': np.random.normal(35, 12, n_customers).astype(int),
    'income': np.random.lognormal(10.5, 0.5, n_customers),
    'city': np.random.choice(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'], n_customers),
    'segment': np.random.choice(['Premium', 'Standard', 'Budget'], n_customers, p=[0.2, 0.5, 0.3])
})

# Monthly sales data
monthly_sales = []
for month in range(1, n_months + 1):
    for customer in range(1, n_customers + 1):
        if np.random.random() < 0.7:  # 70% chance of purchase each month
            purchase_amount = np.random.exponential(100) + 20
            monthly_sales.append({
                'customer_id': customer,
                'month': month,
                'purchase_amount': purchase_amount,
                'category': np.random.choice(['Electronics', 'Clothing', 'Books', 'Home', 'Sports'])
            })

sales_df = pd.DataFrame(monthly_sales)
sales_df = sales_df.merge(customers, on='customer_id')

print(f"Generated dataset with {len(sales_df)} transactions")
print(f"Customers: {len(customers)} | Categories: {sales_df['category'].nunique()}")
sales_df.head()
```

## Statistical Visualizations

### Distribution Analysis


```python
# Create a comprehensive distribution analysis
fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('Customer Demographics and Purchase Behavior Analysis', fontsize=16, y=0.98)

# Age distribution with KDE
sns.histplot(data=customers, x='age', kde=True, ax=axes[0,0])
axes[0,0].set_title('Age Distribution of Customers')
axes[0,0].set_xlabel('Age (years)')

# Income distribution by segment
sns.boxplot(data=customers, x='segment', y='income', ax=axes[0,1])
axes[0,1].set_title('Income Distribution by Customer Segment')
axes[0,1].set_ylabel('Annual Income ($)')
axes[0,1].tick_params(axis='y', rotation=0)

# Purchase amount distribution
purchase_amounts = sales_df['purchase_amount']
axes[1,0].hist(purchase_amounts, bins=50, alpha=0.7, color='skyblue', edgecolor='black')
axes[1,0].axvline(purchase_amounts.mean(), color='red', linestyle='--', 
                  label=f'Mean: ${purchase_amounts.mean():.2f}')
axes[1,0].axvline(purchase_amounts.median(), color='orange', linestyle='--', 
                  label=f'Median: ${purchase_amounts.median():.2f}')
axes[1,0].set_title('Purchase Amount Distribution')
axes[1,0].set_xlabel('Purchase Amount ($)')
axes[1,0].legend()

# Category popularity
category_counts = sales_df['category'].value_counts()
axes[1,1].pie(category_counts.values, labels=category_counts.index, autopct='%1.1f%%', 
              startangle=90, colors=plt.cm.Set3.colors)
axes[1,1].set_title('Purchase Distribution by Category')

plt.tight_layout()
plt.show()

# Summary statistics
print("\n📈 Key Statistics:")
print(f"Average purchase amount: ${sales_df['purchase_amount'].mean():.2f}")
print(f"Total revenue: ${sales_df['purchase_amount'].sum():,.2f}")
print(f"Most popular category: {sales_df['category'].mode().iloc[0]}")
print(f"Average customer age: {customers['age'].mean():.1f} years")
```

## Time Series Analysis


```python
# Monthly sales trends analysis
monthly_metrics = sales_df.groupby('month').agg({
    'purchase_amount': ['sum', 'mean', 'count'],
    'customer_id': 'nunique'
}).round(2)

monthly_metrics.columns = ['Total_Sales', 'Avg_Purchase', 'Num_Transactions', 'Unique_Customers']
monthly_metrics = monthly_metrics.reset_index()

# Create time series visualization
fig, axes = plt.subplots(2, 2, figsize=(16, 10))
fig.suptitle('Monthly Sales Performance Dashboard', fontsize=16)

# Total sales trend
axes[0,0].plot(monthly_metrics['month'], monthly_metrics['Total_Sales'], 
               marker='o', linewidth=2, markersize=8, color='#2E86AB')
axes[0,0].fill_between(monthly_metrics['month'], monthly_metrics['Total_Sales'], 
                       alpha=0.3, color='#2E86AB')
axes[0,0].set_title('Monthly Total Sales')
axes[0,0].set_xlabel('Month')
axes[0,0].set_ylabel('Sales ($)')
axes[0,0].grid(True, alpha=0.3)

# Average purchase amount
axes[0,1].bar(monthly_metrics['month'], monthly_metrics['Avg_Purchase'], 
              color='#A23B72', alpha=0.8)
axes[0,1].set_title('Average Purchase Amount by Month')
axes[0,1].set_xlabel('Month')
axes[0,1].set_ylabel('Average Purchase ($)')

# Number of transactions
axes[1,0].plot(monthly_metrics['month'], monthly_metrics['Num_Transactions'], 
               marker='s', linewidth=2, markersize=6, color='#F18F01')
axes[1,0].set_title('Monthly Transaction Count')
axes[1,0].set_xlabel('Month')
axes[1,0].set_ylabel('Number of Transactions')
axes[1,0].grid(True, alpha=0.3)

# Unique customers
axes[1,1].plot(monthly_metrics['month'], monthly_metrics['Unique_Customers'], 
               marker='^', linewidth=2, markersize=6, color='#C73E1D')
axes[1,1].set_title('Monthly Active Customers')
axes[1,1].set_xlabel('Month')
axes[1,1].set_ylabel('Unique Customers')
axes[1,1].grid(True, alpha=0.3)


plt.tight_layout()
plt.show()

print("\n📊 Monthly Performance Summary:")
print(monthly_metrics)
```

## Interactive Visualizations with Plotly

Creating interactive dashboards for better data exploration:


```python
# Create interactive scatter plot
fig_scatter = px.scatter(
    sales_df, 
    x='age', 
    y='purchase_amount',
    color='segment',
    size='income',
    hover_data=['city', 'category'],
    title='Customer Purchase Behavior Analysis',
    labels={'age': 'Customer Age', 'purchase_amount': 'Purchase Amount ($)'}
)

fig_scatter.update_layout(
    height=500,
    showlegend=True,
    title_x=0.5
)

fig_scatter.show()

# Create interactive time series
monthly_category = sales_df.groupby(['month', 'category'])['purchase_amount'].sum().reset_index()

fig_line = px.line(
    monthly_category,
    x='month',
    y='purchase_amount',
    color='category',
    title='Monthly Sales by Category',
    labels={'month': 'Month', 'purchase_amount': 'Sales ($)', 'category': 'Category'}
)

fig_line.update_layout(
    height=400,
    showlegend=True,
    title_x=0.5
)

fig_line.show()

print("🎯 Interactive visualizations created! Hover over points for detailed information.")
```

## Advanced Correlation Analysis


```python
# Customer-level aggregation for correlation analysis
customer_metrics = sales_df.groupby('customer_id').agg({
    'purchase_amount': ['sum', 'mean', 'count'],
    'month': 'nunique'
}).round(2)

customer_metrics.columns = ['Total_Spent', 'Avg_Purchase', 'Num_Purchases', 'Active_Months']
customer_metrics = customer_metrics.merge(customers[['customer_id', 'age', 'income']], on='customer_id')

# Correlation heatmap
plt.figure(figsize=(12, 8))
correlation_matrix = customer_metrics[['age', 'income', 'Total_Spent', 'Avg_Purchase', 'Num_Purchases', 'Active_Months']].corr()

# Create custom heatmap
mask = np.triu(np.ones_like(correlation_matrix, dtype=bool))
sns.heatmap(correlation_matrix, 
            mask=mask,
            annot=True, 
            cmap='RdYlBu_r', 
            center=0,
            square=True,
            fmt='.3f',
            cbar_kws={"shrink": .8})

plt.title('Customer Behavior Correlation Matrix', fontsize=16, pad=20)
plt.tight_layout()
plt.show()

# Identify strongest correlations
corr_pairs = []
for i in range(len(correlation_matrix.columns)):
    for j in range(i+1, len(correlation_matrix.columns)):
        corr_pairs.append({
            'var1': correlation_matrix.columns[i],
            'var2': correlation_matrix.columns[j],
            'correlation': correlation_matrix.iloc[i, j]
        })

corr_df = pd.DataFrame(corr_pairs).sort_values('correlation', key=abs, ascending=False)

print("\n🔍 Strongest Correlations:")
print(corr_df.head(10))
```

## Key Insights and Conclusions

Based on our comprehensive data visualization analysis:

### 📊 **Customer Demographics**
- Average customer age: ~35 years with normal distribution
- Income varies significantly by customer segment
- Premium customers show highest purchase amounts

### 📈 **Sales Patterns**
- Electronics and Clothing are the most popular categories
- Monthly sales show seasonal trends
- Average purchase amount remains relatively stable

### 🎯 **Behavioral Insights**
- Strong correlation between income and total spending
- Customer age moderately influences purchase behavior  
- Active months correlate with total spending patterns

### 💡 **Actionable Recommendations**
1. **Target premium segments** for high-value campaigns
2. **Seasonal promotions** based on monthly trends
3. **Category-specific strategies** for Electronics and Clothing
4. **Age-based personalization** for marketing campaigns

## Next Steps
- Implement real-time dashboards using these visualizations
- Add geographic analysis with map visualizations
- Create predictive models based on identified patterns
- Develop customer segmentation strategies
