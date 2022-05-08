import React, { useState } from "react";
import "../styles.css";
import BoxTemplate from "./BoxTemplate";
import { PRECISION } from "../constants";

export default function FaucetComponent(props) {
    const [amountOfREZ, setAmountOfREZ] = useState(0);
    const [amountOfABR, setAmountOfABR] = useState(0);

    const onChangeAmountOfABR = (e) => {
        setAmountOfABR(e.target.value);
    };

    const onChangeAmountOfREZ = (e) => {
        setAmountOfREZ(e.target.value);
    };
	
    // Funds the account with given amount of Tokens 
    async function onClickFund() {
        if (props.contract === null) {
            alert("Connect to Metamask");
            return;
        }
        if (["", "."].includes(amountOfREZ) || ["", "."].includes(amountOfABR)) {
            alert("Amount should be a valid number");
            return;
        }
        try {
            let response = await props.contract.faucet(
                amountOfREZ * PRECISION,
                amountOfABR * PRECISION
            );
            let res = await response.wait();
            console.log("res", res);
            setAmountOfREZ(0);
            setAmountOfABR(0);
            await props.getHoldings();
            alert("Success");
        } catch (err) {
            err?.data?.message && alert(err?.data?.message);
            console.log(err);
        }
    }

    return (
        <div className="tabBody">
            <BoxTemplate
                leftHeader={"Amount of REZ"}
                right={"REZ"}
                value={amountOfREZ}
                onChange={(e) => onChangeAmountOfREZ(e)}
            />
            <BoxTemplate
                leftHeader={"Amount of ABR"}
                right={"ABR"}
                value={amountOfABR}
                onChange={(e) => onChangeAmountOfABR(e)}
            />
            <div className="bottomDiv">
                <div className="btn" onClick={() => onClickFund()}>
                    Fund
                </div>
            </div>
        </div>
    );
}
