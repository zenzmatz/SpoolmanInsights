import { Button, Card, Table, Tag } from "antd";
import { useTranslate } from "@refinedev/core";
import { ILocationSummary } from "../model";

interface LocationBreakdownProps {
  items: ILocationSummary[];
  loading: boolean;
  onOpenLocation: (location: string) => void;
}

export function LocationBreakdown({ items, loading, onOpenLocation }: Readonly<LocationBreakdownProps>) {
  const t = useTranslate();

  return (
    <Card title={t("insights.sections.by_location")}>
      <Table<ILocationSummary>
        loading={loading}
        dataSource={items}
        rowKey="location"
        pagination={false}
        size="small"
        columns={[
          {
            title: t("spool.fields.location"),
            dataIndex: "location",
            key: "location",
            render: (value: string) => (value === "Unassigned" ? t("insights.values.unassigned") : value),
          },
          { title: t("spool.spool"), dataIndex: "spool_count", key: "spool_count", align: "right" },
          {
            title: t("spool.fields.remaining_weight"),
            dataIndex: "remaining_weight_total_g",
            key: "remaining_weight_total_g",
            align: "right",
            render: (value: number) => `${value.toFixed(0)} g`,
          },
          {
            title: t("insights.columns.materials"),
            dataIndex: "materials",
            key: "materials",
            render: (values: string[]) => values.map((value) => <Tag key={value}>{value}</Tag>),
          },
          {
            title: t("table.actions"),
            key: "action",
            render: (_, record) => (
              <Button size="small" onClick={() => onOpenLocation(record.location)}>
                {t("insights.actions.view_spools")}
              </Button>
            ),
          },
        ]}
      />
    </Card>
  );
}