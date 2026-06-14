import React from 'react';
import './payoutPolicy.css';

const PayoutPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Payout Policy</h1>
      <p>
        This Payout Policy applies to users of <strong>letsquiz.org</strong> who receive payments based on their quiz earnings. Please review the policy carefully to understand the payout terms, fees, and conditions.
      </p>

      <h2>1. Payout Threshold</h2>
      <p>
        Payouts will be processed once quiz earnings reach a minimum threshold of 5,000 INR. Earnings below this threshold will remain in the account until the minimum payout amount is achieved.
      </p>

      <h2>2. Payout Processing Time</h2>
      <p>
        Upon reaching the 5,000 INR threshold, payouts will be initiated within 15 days from the date of request or eligibility. Processing time may vary based on weekends, public holidays, and banking hours, but <strong>letsquiz.org</strong> aims to process payouts promptly.
      </p>

      <h2>3. Platform Fee</h2>
      <p>
        A platform fee of 5% will be deducted from the total payout amount to cover administrative and operational expenses. For example, if your total payout amount is 5,000 INR, a fee of 250 INR will be deducted, resulting in a net payout of 4,750 INR before additional charges.
      </p>

      <h2>4. Payment Gateway Charges</h2>
      <p>
        Any additional payment gateway charges applicable to the transaction will be borne by the user and deducted from the payout amount. These charges vary by provider and will be specified at the time of payout.
      </p>

      <h2>5. Payout Method</h2>
      <p>
        Payouts will be processed via digital wallet, bank transfer, etc. It is the user’s responsibility to ensure accurate and up-to-date payment information to avoid delays.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        <strong>letsquiz.org</strong> reserves the right to amend this Payout Policy at any time. Any updates will be posted on our website, and users will be notified of significant changes.
      </p>
    </div>
  );
};

export default PayoutPolicy;
