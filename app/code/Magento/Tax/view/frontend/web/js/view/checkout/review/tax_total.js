/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*jshint browser:true jquery:true*/
/*global alert*/
define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/quote',
        'Magento_Catalog/js/price-utils'
    ],
    function (Component, quote, priceUtils) {
        "use strict";
        var isTaxDisplayedInGrandTotal = window.checkoutConfig.includeTaxInGrandTotal;
        var isFullTaxSummaryDisplayed = window.checkoutConfig.isFullTaxSummaryDisplayed;
        return Component.extend({
            defaults: {
                isTaxDisplayedInGrandTotal: isTaxDisplayedInGrandTotal,
                template: 'Magento_Tax/checkout/review/tax_total'
            },
            colspan: 3,
            totals: quote.getTotals(),
            style: "123",
            isFullTaxSummaryDisplayed: isFullTaxSummaryDisplayed,
            lastTaxGroupId: null,
            isFirst: function(taxGroupId) {
                if (this.lastTaxGroupId != taxGroupId) {
                    this.lastTaxGroupId = taxGroupId;
                    return true;
                }
                return false;
            },
            getTitle: function() {
                return "Tax";
            },
            getValue: function() {
                var amount = 0;
                if (quote.getTotals()) {
                    amount = this.totals().tax_amount;
                }
                return priceUtils.formatPrice(amount, quote.getPriceFormat());
            },
            formatPrice: function(amount) {
                return priceUtils.formatPrice(amount, quote.getPriceFormat());
            },
            getDetails: function() {
                var totals = quote.getTotals()();
                if (totals.extension_attributes) {
                    return totals.extension_attributes.tax_grandtotal_details;
                }
                return [];
            }
        });
    }
);
