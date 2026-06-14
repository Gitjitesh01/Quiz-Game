import React from 'react';
import './RefundPolicy.css';

const RefundAndCancellationPolicy = () => {
  return (
    <div className="policy-container">
      <h1 className="policy-title">Refund and Cancellation Policy for Subscriptions</h1>
      <p className="policy-text">
        Thank you for subscribing to letsquiz.org. Please read our Refund and Cancellation Policy carefully before completing your subscription. By subscribing, you agree to the terms outlined below.
      </p>
      <h2 className="policy-heading">1. No Refunds</h2>
      <p className="policy-text">
        All subscription payments on letsquiz.org are final. Due to the nature of our digital subscription services, we do not offer refunds for any reason. This includes, but is not limited to, cases of accidental subscriptions, dissatisfaction with content, or lack of usage.
      </p>
      <h2 className="policy-heading">2. No Cancellations</h2>
      <p className="policy-text">
        Once a subscription is activated, it cannot be cancelled or altered during the active billing cycle. Please ensure that you review your subscription details before confirming the purchase, as cancellations mid-cycle are not permitted.
      </p>
      <h2 className="policy-heading">3. Subscription Renewal</h2>
      <p className="policy-text">
        Your subscription will automatically renew based on the selected billing period unless cancelled before the renewal date. To avoid future charges, you may turn off auto-renewal before the current subscription period ends. No partial refunds or credits will be provided for any unused portion of the subscription.
      </p>
      <h2 className="policy-heading">4. Changes to This Policy</h2>
      <p className="policy-text">
        letsquiz.org reserves the right to amend this Refund and Cancellation Policy for Subscriptions at any time. Any changes will be effective immediately upon posting to our website.
      </p>
    </div>
  );
};

export default RefundAndCancellationPolicy;
