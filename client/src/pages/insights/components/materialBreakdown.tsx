import { Button, Card, Table } from "antd";
import { useTranslate } from "@refinedev/core";
import { IMaterialSummary } from "../model";

interface MaterialBreakdownProps {
  items: IMaterialSummary[];
  loading: boolean;
  onOpenMaterial: (material: string) => void;
}

export function MaterialBreakdown({ items, loading, onOpenMaterial }: Readonly<MaterialBreakdownProps>) {
  const t = useTranslate();

  return (
    <Card title={t("insights.sections.by_material")}>
      <Table<IMaterialSummary>
        loading={loading}
        dataSource={items}
        rowKey="material"
        pagination={false}
        size="small"
        columns={[
          { title: t("spool.fields.material"), dataIndex: "material", key: "material" },
          { title: t("spool.spool"), dataIndex: "spool_count", key: "spool_count", align: "right" },
          {
            title: t("spool.fields.remaining_weight"),
            dataIndex: "remaining_weight_total_g",
            key: "remaining_weight_total_g",
            align: "right",
            render: (value: number) => `${value.toFixed(0)} g`,
          },
          { title: t("insights.overview.low_stock"), dataIndex: "low_stock_count", key: "low_stock_count", align: "right" },
          {
            title: t("table.actions"),
            key: "action",
            render: (_, record) => (
              <Button size="small" onClick={() => onOpenMaterial(record.material)}>
                {t("insights.actions.view_spools")}
              </Button>
            ),
          },
        ]}
      />
    </Card>
  );
}