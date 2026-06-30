import { Card, Col, Row, Statistic } from "antd";
import { useTranslate } from "@refinedev/core";
import { IInsightsOverview } from "../model";

interface OverviewCardsProps {
  overview?: IInsightsOverview;
  loading: boolean;
  onOpenLowStock: () => void;
}

function formatKilograms(weightInGrams: number): string {
  return `${(weightInGrams / 1000).toFixed(1)} kg`;
}

export function OverviewCards({ overview, loading, onOpenLowStock }: Readonly<OverviewCardsProps>) {
  const t = useTranslate();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} xl={6}>
        <Card loading={loading}>
          <Statistic title={t("insights.overview.active_spools")} value={overview?.active_spool_count ?? 0} />
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card loading={loading} hoverable onClick={onOpenLowStock}>
          <Statistic title={t("insights.overview.low_stock")} value={overview?.low_stock_count ?? 0} />
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card loading={loading}>
          <Statistic title={t("insights.overview.locations")} value={overview?.location_count ?? 0} />
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card loading={loading}>
          <Statistic title={t("insights.overview.remaining_inventory")} value={formatKilograms(overview?.remaining_weight_total_g ?? 0)} />
        </Card>
      </Col>
    </Row>
  );
}