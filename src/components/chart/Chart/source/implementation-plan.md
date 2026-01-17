# Chart Component Implementation Plan

## 📋 Overview

This document analyzes the Figma data for Chart components and outlines the implementation strategy. All data has been collected from Figma using the REST API.

---

## 🎯 Chart Types Identified

Based on the Figma data, the following chart types are available:

1. **Line Chart** (`Line chart area`)
2. **Bar Chart** (`Bar Chart Area`)
3. **Donut Chart** (`Donut Chart`)
4. **Pie Chart** (`Pie Chart`)

---

## 📊 Component Structure Analysis

### Common Components

All charts share these common structural elements:

1. **Container/Frame**: Main wrapper with white background and shadow effects
2. **Chart Area**: The actual visualization area
3. **Axes**:
   - **X Axis** (`X Axis Items`, `X Axis Lines`)
   - **Y Axis** (`Y Axis Items`, `Y Axis Lines`)
4. **Data Elements**:
   - **Bars** (`Bars chart items`, `Bar List Items`)
   - **Lines** (for line charts)
   - **Slices** (for pie/donut charts)

### Chart-Specific Components

#### 1. Bar Chart (`Bar Chart Area`)
- **Structure**:
  - Container with transparent background
  - Multiple `Bar` elements (frames)
  - Each bar contains:
    - `Bars chart items` instance (the actual colored bar)
    - Corner radius: 2px
    - Colors: Variable-based (e.g., green: `rgb(0.267, 0.729, 0.510)`)
- **Axis**:
  - X Axis: Labels at bottom
  - Y Axis: Values on left
  - Grid lines for both axes

#### 2. Line Chart (`Line chart area`)
- **Structure**:
  - Container with transparent background
  - Path/Vector elements for lines
  - Data points (circles/dots)
  - Area fill (optional)
- **Axis**:
  - Similar to Bar Chart
  - X Axis: Time/categories
  - Y Axis: Values

#### 3. Donut Chart (`Donut Chart`)
- **Structure**:
  - Circular container
  - Multiple slices (arcs)
  - Center hole (donut shape)
  - Legend (optional)
- **Data**:
  - Percentage-based slices
  - Colors per slice

#### 4. Pie Chart (`Pie Chart`)
- **Structure**:
  - Similar to Donut Chart
  - No center hole (full circle)
  - Multiple slices
  - Legend (optional)

---

## 🎨 Styling Details

### Colors
- **Text**: `#6f6f77` (RGB: 0.435, 0.435, 0.465) - Variable ID: `VariableID:16:22`
- **Background**: White (`#ffffff`)
- **Bars**: Variable colors (green example: `rgb(0.267, 0.729, 0.510)`)
- **Grid Lines**: Light gray with opacity

### Typography
- **Axis Labels**: Small text, muted color
- **Values**: Medium weight, muted color
- **Font**: System default (Spoqa Han Sans Neo for Korean)

### Spacing
- **Padding**: Container has padding around chart area
- **Gap**: Spacing between bars/elements
- **Margin**: Space for axes and labels

### Effects
- **Container Shadow**: Multiple drop shadows for depth
- **Border Radius**: 2px for bars, full circle for pie/donut

---

## 🏗️ Implementation Strategy

### Phase 1: Base Chart Component

Create a base `Chart` component with:
- Container with proper styling (white bg, shadows)
- Responsive sizing
- Dark mode support
- Common props interface

### Phase 2: Chart Type Components

Create separate components for each chart type:

1. **`BarChart`**
   - Props: `data`, `xAxis`, `yAxis`, `colors`, `showGrid`
   - Renders bars with proper spacing
   - Handles axis rendering

2. **`LineChart`**
   - Props: `data`, `xAxis`, `yAxis`, `colors`, `showArea`, `showPoints`
   - Renders line paths
   - Handles area fills

3. **`PieChart`**
   - Props: `data`, `colors`, `showLegend`
   - Renders pie slices
   - Calculates angles and percentages

4. **`DonutChart`**
   - Props: Similar to PieChart + `innerRadius`
   - Renders donut slices
   - Center hole calculation

### Phase 3: Shared Components

1. **`ChartAxis`** (X and Y)
   - Renders axis lines
   - Renders labels
   - Handles grid lines

2. **`ChartLegend`**
   - Renders legend items
   - Color indicators
   - Labels

3. **`ChartTooltip`**
   - Hover tooltips
   - Value display
   - Positioning

### Phase 4: Data Processing

- **Data normalization**: Convert raw data to chart format
- **Scale calculations**: Map data to pixel coordinates
- **Color mapping**: Assign colors to data series
- **Animation**: Optional transitions

---

## 📦 Technology Considerations

### Chart Library Options

Since no chart library is currently installed, we have two options:

1. **Use a Chart Library** (Recommended for complex charts):
   - **Recharts** (React + D3): Most popular, flexible
   - **Chart.js + react-chartjs-2**: Good performance
   - **Victory**: Declarative API
   - **Nivo**: Beautiful defaults, good customization

2. **Custom SVG Implementation**:
   - Full control over styling
   - Matches Figma exactly
   - More development time
   - Better for simple charts

### Recommendation

**Hybrid Approach**:
- Use **Recharts** for complex charts (Line, Bar with multiple series)
- Custom SVG for simple charts (Pie, Donut)
- This balances development speed with design accuracy

---

## 📝 Component API Design

### Base Chart Props

```typescript
interface BaseChartProps {
  width?: number;
  height?: number;
  data: ChartData[];
  colors?: string[];
  darkMode?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
}
```

### Bar Chart Props

```typescript
interface BarChartProps extends BaseChartProps {
  xAxis: {
    dataKey: string;
    label?: string;
  };
  yAxis: {
    dataKey: string;
    label?: string;
    domain?: [number, number];
  };
  barSize?: number;
  gap?: number;
}
```

### Line Chart Props

```typescript
interface LineChartProps extends BaseChartProps {
  xAxis: {
    dataKey: string;
    label?: string;
  };
  yAxis: {
    dataKey: string;
    label?: string;
    domain?: [number, number];
  };
  showArea?: boolean;
  showPoints?: boolean;
  strokeWidth?: number;
}
```

### Pie/Donut Chart Props

```typescript
interface PieChartProps extends BaseChartProps {
  dataKey: string;
  nameKey: string;
  innerRadius?: number; // For donut chart
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
}
```

---

## 🎯 Next Steps

1. **Install Chart Library** (if using Recharts):
   ```bash
   npm install recharts
   ```

2. **Create Base Structure**:
   - `Chart/Chart.tsx` - Base component
   - `Chart/Chart.types.ts` - Type definitions
   - `Chart/BarChart/BarChart.tsx` - Bar chart implementation
   - `Chart/LineChart/LineChart.tsx` - Line chart implementation
   - `Chart/PieChart/PieChart.tsx` - Pie chart implementation
   - `Chart/DonutChart/DonutChart.tsx` - Donut chart implementation
   - `Chart/ChartAxis/ChartAxis.tsx` - Axis component
   - `Chart/ChartLegend/ChartLegend.tsx` - Legend component

3. **Implement Styling**:
   - Match Figma colors exactly
   - Implement shadows and effects
   - Add dark mode support
   - Responsive sizing

4. **Create Stories**:
   - Examples for each chart type
   - Different data configurations
   - Dark mode examples
   - Interactive examples

---

## 📊 Data Structure Example

```typescript
// Example data structure
const chartData = [
  { name: 'Jan', value: 100, category: 'Sales' },
  { name: 'Feb', value: 150, category: 'Sales' },
  { name: 'Mar', value: 120, category: 'Sales' },
];

// For pie/donut charts
const pieData = [
  { name: 'Category A', value: 30, percentage: 30 },
  { name: 'Category B', value: 45, percentage: 45 },
  { name: 'Category C', value: 25, percentage: 25 },
];
```

---

## ✅ Implementation Checklist

- [ ] Install chart library (if using)
- [ ] Create base Chart component
- [ ] Implement BarChart
- [ ] Implement LineChart
- [ ] Implement PieChart
- [ ] Implement DonutChart
- [ ] Create ChartAxis component
- [ ] Create ChartLegend component
- [ ] Add dark mode support
- [ ] Match Figma styling exactly
- [ ] Create Storybook stories
- [ ] Add TypeScript types
- [ ] Add accessibility features
- [ ] Add responsive behavior
- [ ] Add animations/transitions

---

## 📚 References

- Figma Data: `src/components/chart/Chart/source/figma-data.json`
- Chart Icons: `src/icons/business/` (BarChartIcon, LineChartIcon, PieChartIcon, DonutChartIcon)
- Design System Rules: `.mcp/design-system.md`
