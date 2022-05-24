import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "./common/Modal"
import { getStockDetailsApi } from "../clients/stocks";
import Card from "./common/Card";
import StocksChart, { CHART_FILTERS } from "./StockChart";
import { getStockTimeSeriesApi } from "../clients/stocks";
import EmptyState from "./common/EmptyState";

function StocksModal(props) {
    const [details, setDetails] = useState(null)
    const [chartFilter, setChartFilter] = useState(CHART_FILTERS.ONE_DAY)
    const [chartData, setChartData] = useState([])

    async function getStockDeatils() {
        const response = await getStockDetailsApi(props.ticker)
        setDetails(response)
    }

    async function getDataForChart() {
        let response = await getStockTimeSeriesApi(props.ticker, chartFilter)
        setChartData(response)
    }

    function renderDetails() {
        function renderRow(left, right) {
            return (
                <div className="flex justify-between border-t py-2">
                    <div className="font-semibold uppercase text-gray-600">
                        {left}
                    </div>
                    <div className="text-gray-500">
                        {right}
                    </div>
                </div>
            )
        }

        return (
            <div className="flex flex-col gap-5">
                <Card className="grow" title="Chart">
                    {chartData.length !== 0 && <StocksChart ticker={props.ticker} data={chartData} onChange={(e) => { setChartFilter(e); }} />}
                    {chartData.length === 0 && <EmptyState text="No data." />}
                </Card>
                <Card title="Details">
                    <p className="text-lg font-bold pb-5 text-gray-600">
                        {details['opisHartije']}
                    </p>
                    <div className="flex flex-col">
                        {renderRow("Previous close:", details['previousClose'])}
                        {renderRow("Change:", details['change'] + '(' + details['changePercent'] + ')')}
                        {renderRow("Day range:", details['low'] + ' - ' + details['high'])}
                        {renderRow("Open:", details['open'])}
                        {renderRow("Low:", details['low'])}
                        {renderRow("High:", details['high'])}
                        {renderRow("Price volume", details['priceVolume'])}
                        {renderRow("Volume", details['volume'])}
                        {renderRow("Outstanding shares", details['outstandingShares'])}
                        {renderRow("Market cap", details['marketCap'])}
                    </div >
                </Card>
            </div>
        )
    }

    function renderPlaceholder() {
        return (
            <Card title="" className="flex flex-col gap-3">
                {/* <PlaceholderLoading shape="rect" width={'100%'} height={20} />
                <PlaceholderLoading shape="rect" width={'90%'} height={20} />
                <PlaceholderLoading shape="rect" width={'100%'} height={20} />
                <PlaceholderLoading shape="rect" width={'90%'} height={20} />
                <PlaceholderLoading shape="rect" width={'100%'} height={20} />
                <PlaceholderLoading shape="rect" width={'90%'} height={20} /> */}
            </Card>
        )
    }

    useEffect(() => {
        getStockDeatils()
    }, [])

    useEffect(() => {
        getDataForChart()
    }, [chartFilter])

    return (
        <Modal id="stocks-modal" visible={true} onClose={props.onClose} title={props.ticker} className="min-w-[1100px]">
            <div>
                {!details && renderPlaceholder()}
                {details && renderDetails()}
            </div>
        </Modal>
    )
}

StocksModal.propTypes = {
    ticker: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default StocksModal