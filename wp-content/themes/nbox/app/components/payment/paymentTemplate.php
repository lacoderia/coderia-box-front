<?php
    wp_enqueue_script( 'conekta' );
    wp_enqueue_script( 'PaymentService' );
    wp_enqueue_script( 'PaymentController' );
    wp_enqueue_script( 'Card' );
?>
<!-- TODO: agregar el ng-show -->
<div id="payment" class="payment-component animate-visibility" ng-controller="PaymentController as paymentCtrl" ng-init="paymentCtrl.init(<?php echo htmlspecialchars(json_encode(get_option('conekta_public'))); ?>)" ng-show="paymentCtrl.isVisible()">

    <!--h2>Selecciona un método de pago</h2>
    <p>Paga con tu cuenta principal registrada o agrega una nueva tarjeta de crédito.</p-->
    <h2>Verifica y compra tu paquete</h2>
    <p>Paga con tu cuenta principal registrada o agrega una nueva tarjeta de crédito.</p>
    <div class="payment-wrapper">
        <div class="payment-section">
            <h3>Método de pago</h3>
            <div class="no-card" ng-if="!paymentCtrl.hasPrimaryCard()" ng-class="{ true: 'active', false: ''}[paymentCtrl.isNewCardActive()]" ng-mouseover="paymentCtrl.setNewCardFormStatus(true)" ng-mouseout="paymentCtrl.setNewCardFormStatus(false)">
                <div class="card-title">Pagar con tarjeta de crédito</div>
                <div class="card-info">
                    <form novalidate name="paymentCtrl.newCardForm" class="form" ng-submit="paymentCtrl.saveCard()">
                        <span class="required-message">{{ formMessage }}</span>
                        <div class="card-info-row">
                            <div class="card-info-cell full-width">
                                <input type="text" name="debitCardNumber" ng-model="paymentCtrl.newCard.debitCardNumber" pattern="/^[0-9]+$/" ng-pattern="/^[0-9]+$/" ng-minlength="14" ng-maxlength="16" maxlength="16" class="number card-info-input" placeholder="* Número de la tarjeta de crédito" required>
                                <div class="required-message" ng-show="paymentCtrl.newCardForm.$submitted || paymentCtrl.newCardForm.debitCardNumber.$touched">
                                    <span ng-show="paymentCtrl.newCardForm.debitCardNumber.$error.required">El número de la tarjeta es requerido.</span>
                                    <span ng-show="paymentCtrl.newCardForm.debitCardNumber.$error.pattern">El número de la tarjeta no es válido.</span>
                                    <span ng-show="paymentCtrl.newCardForm.debitCardNumber.$error.minlength || paymentCtrl.newCardForm.debitCardNumber.$error.maxlength">El número de la tarjeta no es válido</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-info-row">
                            <div class="card-info-cell third-width">
                                <select name="expirationYear" ng-model="paymentCtrl.newCard.expirationYear" required>
                                    <option value="">* Año</option>
                                    <option ng-repeat="year in paymentCtrl.availableYears" value="{{ year - 2000 }}">{{ year }}</option>
                                </select>
                                <div class="required-message" ng-show="paymentCtrl.newCardForm.$submitted || paymentCtrl.newCardForm.expirationYear.$touched">
                                    <span ng-show="paymentCtrl.newCardForm.expirationYear.$error.required">Requerido.</span>
                                </div>
                            </div>
                            <div class="card-info-cell third-width">
                                <select name="expirationMonth" ng-model="paymentCtrl.newCard.expirationMonth" required>
                                    <option value="">* Mes</option>
                                    <option ng-repeat="month in paymentCtrl.MONTHS" value="{{ $index+1 }}">{{ month }}</option>
                                </select>
                                <div class="required-message" ng-show="paymentCtrl.newCardForm.$submitted || paymentCtrl.newCardForm.expirationMonth.$touched">
                                    <span ng-show="paymentCtrl.newCardForm.expirationMonth.$error.required">Requerido.</span>
                                </div>
                            </div>
                            <div class="card-info-cell third-width">
                                <input type="text" name="debitCardValidationNumber" ng-model="paymentCtrl.newCard.debitCardValidationNumber" ng-pattern="/^[0-9]+$/" ng-minlength="3" ng-maxlength="4" maxlength="4" class="number card-info-input" placeholder="* CVV" required>
                                <div class="required-message" ng-show="paymentCtrl.newCardForm.$submitted || paymentCtrl.newCardForm.debitCardValidationNumber.$touched">
                                    <span ng-show="paymentCtrl.newCardForm.debitCardValidationNumber.$error.required">Requerido.</span>
                                    <span ng-show="paymentCtrl.newCardForm.debitCardValidationNumber.$error.pattern">No es válido.</span>
                                    <span ng-show="paymentCtrl.newCardForm.debitCardValidationNumber.$error.minlength || paymentCtrl.newCardForm.debitCardNumber.$error.maxlength">No es válido</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-info-row">
                            <div class="card-info-cell full-width">
                                <input class="card-info-input" name="debitCardHolder" ng-model="paymentCtrl.newCard.debitCardHolder" placeholder="* Nombre en la tarjeta de crédito" required>
                                <div class="required-message" ng-show="paymentCtrl.newCardForm.$submitted || paymentCtrl.newCardForm.debitCardHolder.$touched">
                                    <span ng-show="paymentCtrl.newCardForm.debitCardHolder.$error.required">El nombre es requerido.</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-info-row">
                            <div class="card-info-cell full-width">
                                <input type="tel" name="phoneNumber" ng-model="paymentCtrl.newCard.phoneNumber" ng-pattern="/^[0-9]+$/" ng-minlength="8" ng-maxlength="10" maxlength="10" class="card-info-input" placeholder="* Número de teléfono" required>
                                <div class="required-message" ng-show="paymentCtrl.newCardForm.$submitted || paymentCtrl.newCardForm.phoneNumber.$touched">
                                    <span ng-show="paymentCtrl.newCardForm.phoneNumber.$error.required">El número de teléfono es requerido.</span>
                                    <span ng-show="paymentCtrl.newCardForm.phoneNumber.$error.pattern">El número de teléfono no es válido.</span>
                                    <span ng-show="paymentCtrl.newCardForm.phoneNumber.$error.minlength || paymentCtrl.newCardForm.phoneNumber.$error.maxlength">El número de teléfono no es válido</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-info-row">
                            <div class="card-info-cell full-width">
                                <ul class="payment-options">
                                    <li><img alt="Visa" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/visa.png'; ?>"></li>
                                    <li><img alt="MasterCard" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/mastercard.png'; ?>"></li>
                                    <li><img alt="Carnet" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/carnet.png'; ?>"></li>
                                    <li><img alt="American Express" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/amex.png'; ?>"></li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-info-row">
                            <div class="card-info-cell full-width">
                                <a class="button-red" ng-click="paymentCtrl.processingPayment || paymentCtrl.processPayment()" ng-class="{ true: '', false: 'disabled' }[paymentCtrl.newCardForm.$valid]" ng-disabled="!paymentCtrl.newCardForm.$valid"><span class="icon-lock"></span>&nbsp;&nbsp;guardar y pagar</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <card ng-if="paymentCtrl.hasPrimaryCard()">
                <div class="card">
                    <div class="card-info top-border">
                        <div class="card-info-row">
                            <div class="card-info-cell full-width">
                                <span class=" card-number card-info-input">XXXX-XXXX-XXXX-{{ paymentCtrl.primaryCard.getLastNumbers() }}</span>
                            </div>
                        </div>
                        <div class="card-info-row">
                            <div class="card-info-cell full-width">
                                <div class="card-info-label card-expiration-date-label">Vencimiento: </div>
                                <span class="card-info-input card-expiration-date">{{ paymentCtrl.primaryCard.getExpYear() }}/{{ paymentCtrl.primaryCard.getExpMonth() }}</span>
                            </div>
                        </div>
                        <div class="card-info-row">
                            <div class="card-info-cell full-width">
                                <span type="text" class="card-name card-info-input">{{ paymentCtrl.primaryCard.getName() }}</span>
                            </div>
                        </div>
                        <div class="card-info-row">
                            <div class="card-info-cell full-width">
                                <a class="action-link" ng-class="icon-accept" title="Usar otra" ng-click="paymentCtrl.redirectProfilePayment()">Usar otra</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-info-brand"><span class="{{ paymentCtrl.primaryCard.getBrandClass() }} icon-card"></span></div>
                    <div class="main-card" ng-if="paymentCtrl.primaryCard.getPrimary()"><span class="icon-main-card"></span> Principal</div>
                </div>
            </card>
        </div>
        <div class="cart-section">
            <h3>Resumen de la compra</h3>
            <div class="border-container">
                <span us-spinner spinner-key="discount-spinner"></span>

                <div class="cart-item-name">{{ paymentCtrl.getSelectedPack().getDescription() }}</div>
                <div class="cart-subsection">Subtotal: {{ paymentCtrl.getSelectedPack().getPrice() | currency:"$" }}</div>
                <div class="cart-actions cart-subsection" ng-show="!paymentCtrl.getDiscountType() && !paymentCtrl.isCouponFormVisible()">
                    <a ng-click="paymentCtrl.showCouponForm()">Aplicar cupón</a> <span ng-show="paymentCtrl.getUserBalance() > 0">o</span> <a ng-click="paymentCtrl.applyDiscount('balance')" ng-show="paymentCtrl.getUserBalance() > 0">Aplicar saldo a favor</a>
                </div>
                <span ng-show="paymentCtrl.formErrorMessage" class="required-message error-message ">{{ paymentCtrl.formErrorMessage }}</span>
                <div class="cart-subsection" ng-show="paymentCtrl.isCouponFormVisible()">
                    <form novalidate name="paymentCtrl.couponForm" class="form" ng-submit="paymentCtrl.applyDiscount('coupon')">
                        <fieldset class="coupon-form">
                            <div class="input-cell">
                                <input type="text" placeholder="cupón" name="coupon" ng-model="paymentCtrl.coupon.coupon" required>
                            </div>
                            <div class="button-cell">
                                <button class="button-white button-apply">validar</button>
                            </div>
                        </fieldset>
                        <a class="action-button" ng-click="paymentCtrl.cancelDiscount()">Cancelar</a>
                    </form>
                </div>

                <div class="cart-subsection" ng-show="paymentCtrl.getDiscountType()">
                    <span ng-show="paymentCtrl.getDiscountType() == 'coupon'">Cupón: -{{ paymentCtrl.getDiscountAmount() | currency:"$" }}</span>
                    <span ng-show="paymentCtrl.getDiscountType() == 'balance'">Saldo a favor:-{{ paymentCtrl.getDiscountAmount() | currency:"$" }}</span>
                    <a ng-click="paymentCtrl.cancelDiscount()">Cancelar</a>
                </div>

                <div class="cart-subsection cart-total">Total: {{ paymentCtrl.getPurchaseTotal() | currency:"$" }}</div>
                <a class="button-red" ng-if="paymentCtrl.hasPrimaryCard()" ng-click="paymentCtrl.processingPayment || paymentCtrl.processPayment()" ng-class="{ true: 'disabled', false: '' }[paymentCtrl.processingPayment]" ng-disabled="paymentCtrl.processingPayment">Pagar</a>
            </div>
        </div>
    </div>

</div>