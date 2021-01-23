define(['jquery'], function ($) {

    return function (SwatchRenderer) {
        var calculateDiscount = function (oldPrice, finalPrice) {
            return Math.round(
                ( (oldPrice - finalPrice) / oldPrice ) * 100
            )
        }

        $.widget('mage.SwatchRenderer', SwatchRenderer, {
            _UpdatePrice: function () {
                this._super()

                var prices = this._getNewPrices()
                var $product = this.element.parents(this.options.selectorProduct)
                var $productPrice = $product.find(this.options.selectorProductPrice)
                var replaceIn = $productPrice.find('.old-price')

                var discountAmount = calculateDiscount(prices.oldPrice.amount, prices.finalPrice.amount)
                if (!$(replaceIn).children('.discount-badge').length) {
                    $(replaceIn).append(
                        '<div class="discount-badge">' +
                            '-' + discountAmount + '%' +
                        '</div>'
                    )
                }
            }
        })
        return $.mage.SwatchRenderer
    }
})
