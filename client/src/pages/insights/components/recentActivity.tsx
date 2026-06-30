import { Button, Card, Space, Table, Tag } from "antd";
import { useTranslate } from "@refinedev/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IRecentActivityItem } from "../model";

dayjs.extend(relativeTime);

interface RecentActivityProps {
  items: IRecentActivityItem[];
  loading: boolean;
  days: number;
  onOpenSpool: (spoolId: number) => void;
}

export function RecentActivity({ items, loading, days, onOpenSpool }: Readonly<RecentActivityProps>) {
  const t = useTranslate();

  return (
    <Card title={t("insights.sections.recent_activity", { days })}>
      <Table<IRecentActivityItem>
        loading={loading}
        dataSource={items}
        rowKey="spool_id"
        pagination={false}
        size="small"
        scroll={{ x: "max-content" }}
        columns={[
          {
            title: t("spool.spool"),
            key: "spool",
            render: (_, record) => {
              const vendorName = record.vendor_name ?? t("insights.values.unknown_vendor");
              const filamentName = record.filament_name ?? "#" + String(record.spool_id);
              return `${vendorName} - ${filamentName}`;
            },
          },
          { title: t("spool.fields.material"), dataIndex: "material", key: "material" },
          {
            title: t("spool.fields.location"),
            dataIndex: "location",
            key: "location",
            render: (value: string | undefined) => (value === "Unassigned" ? t("insights.values.unassigned") : value),
          },
          {
            title: t("spool.fields.last_used"),
            dataIndex: "last_used",
            key: "last_used",
            render: (value: string) => dayjs(value).fromNow(),
          },
          {
            title: t("spool.fields.remaining_weight"),
            dataIndex: "remaining_weight_g",
            key: "remaining_weight_g",
            align: "right",
            render: (value: number | undefined) => (value === undefined ? <Tag>{t("unknown")}</Tag> : `${value.toFixed(0)} g`),
          },
          {
            title: t("table.actions"),
            key: "action",
            render: (_, record) => (
              <Space>
                <Button size="small" onClick={() => onOpenSpool(record.spool_id)}>
                  {t("buttons.show")}
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </Card>
  );
}