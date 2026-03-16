import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { colors, spacing, typography, radii } from '../styles/tokens';

interface AllocationItem {
  name: string;
  value: number;
  color: string;
}

export default function AllocationCard({ data }: { data: AllocationItem[] }) {
  return (
    <div style={{
      background: colors.bg.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      border: `1px solid ${colors.border.primary}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
        <div style={{ width: 140, height: 140, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, flex: 1 }}>
          {data.map(item => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm, flex: 1 }}>{item.name}</span>
              <span style={{ color: colors.text.primary, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold }}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
