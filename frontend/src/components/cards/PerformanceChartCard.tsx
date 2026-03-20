import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { colors, spacing, typography, radii } from '../../styles/tokens';
import { performanceData } from '../../data/mock';

const ranges = ['1W', '1M', '3M', '1Y'] as const;

const filterByRange = (data: { date: string; value: number }[], range: string) => {
  const now = new Date();
  const cutoff = new Date();
  switch (range) {
    case '1W': cutoff.setDate(now.getDate() - 7); break;
    case '1M': cutoff.setMonth(now.getMonth() - 1); break;
    case '3M': cutoff.setMonth(now.getMonth() - 3); break;
    case '1Y': cutoff.setFullYear(now.getFullYear() - 1); break;
    default: return data;
  }
  return data.filter(d => new Date(d.date) >= cutoff);
};

export default function PerformanceChartCard() {
  const [range, setRange] = useState<string>('3M');
  const filtered = filterByRange(performanceData, range);
  const isUp = filtered.length > 1 && filtered[filtered.length - 1].value >= filtered[0].value;
  const lineColor = isUp ? colors.status.gain : colors.status.loss;

  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.md,
      border: `1px solid ${colors.border.primary}`,
    }}>
      <div style={{ display: 'flex', gap: spacing.xs, marginBottom: spacing.md }}>
        {ranges.map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              background: range === r ? colors.accent.muted : 'transparent',
              border: range === r ? `1px solid ${colors.accent.primary}` : '1px solid transparent',
              borderRadius: radii.full,
              padding: `2px ${spacing.sm}`,
              color: range === r ? colors.accent.primary : colors.text.tertiary,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.semibold,
              cursor: 'pointer',
            }}
          >{r}</button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={filtered}>
          <defs>
            <linearGradient id="chatChartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lineColor} stopOpacity={0.2} />
              <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: colors.text.tertiary, fontSize: 10 }}
            tickFormatter={(v) => {
              const d = new Date(v);
              return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
            minTickGap={50}
          />
          <YAxis hide domain={['dataMin - 200', 'dataMax + 200']} />
          <Tooltip
            contentStyle={{
              background: colors.bg.elevated,
              border: `1px solid ${colors.border.primary}`,
              borderRadius: radii.md,
              color: colors.text.primary,
              fontSize: 12,
            }}
            formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Value']}
            labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2}
            fill="url(#chatChartGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
