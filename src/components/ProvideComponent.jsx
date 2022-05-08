import { MdAdd } from "react-icons/md";
import React, { useState } from "react";
import "../styles.css";
import BoxTemplate from "./BoxTemplate";
import { PRECISION } from "../constants";

export default function ProvideComponent(props) {
    const [amountOfREZ, setAmountOfREZ] = useState(0);
    const [amountOfABR, setAmountOfABR] = useState(0);
    const [error, setError] = useState("");

    // Gets estimates of a token to be provided in the pool given the amount of other token
    const getProvideEstimate = async (token, value) => {
        if (["", "."].includes(value)) return;
        if (props.contract !== null) {
            try {
                let estimate;
                if (token === "REZ") {
                    estimate = await props.contract.getEquivalentToken2Estimate(
                        value * PRECISION
                    );
                    setAmountOfABR(estimate / PRECISION);
                } else {
                    estimate = await props.contract.getEquivalentToken1Estimate(
                        value * PRECISION
                    );
                    setAmountOfREZ(estimate / PRECISION);
                }
            } catch (err) {
                if (err?.data?.message?.includes("Zero Liquidity")) {
                    setError("Message: Empty pool. Set the initial conversion rate.");
                } else {
                    alert(err?.data?.message);
                }
            }
        }
    };

    const onChangeAmountOfREZ = (e) => {
        setAmountOfREZ(e.target.value);
        getProvideEstimate("REZ", e.target.value);
    };

    const onChangeAmountOfABR = (e) => {
        setAmountOfABR(e.target.value);
        getProvideEstimate("ABR", e.target.value);
    };

    // Adds liquidity to the pool
    const provide = async () => {
        if (["", "."].includes(amountOfREZ) || ["", "."].includes(amountOfABR)) {
            alert("Amount should be a valid number");
            return;
        }
        if (props.contract === null) {
            alert("Connect to Metamask");
            return;
        } else {
            try {
                let response = await props.contract.provide(
                    amountOfREZ * PRECISION,
                    amountOfABR * PRECISION
                );
                await response.wait();
                setAmountOfREZ(0);
                setAmountOfABR(0);
                await props.getHoldings();
                alert("Success");
                setError("");
            } catch (err) {
                err && alert(err?.data?.message);
            }
        }
    };

    return (
        <div className="tabBody">
            <BoxTemplate
                leftHeader={"Amount of REZ"}
                value={amountOfREZ}
                onChange={(e) => onChangeAmountOfREZ(e)}
            />
            <div className="swapIcon">
                <MdAdd />
            </div>
            <BoxTemplate
                leftHeader={"Amount of ABR"}
                value={amountOfABR}
                onChange={(e) => onChangeAmountOfABR(e)}
            />
            <div className="error">{error}</div>
            <div className="bottomDiv">
                <div className="btn" onClick={() => provide()}>
                    Provide
                </div>
            </div>
        </div>
    );
}
