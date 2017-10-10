<?php
    wp_enqueue_script( 'Pack' );
    wp_enqueue_script( 'PackService' );
    wp_enqueue_script( 'PackController' );

?>

<div id="packs" ng-controller="PackController as packCtrl" class="pack-component animate-visibility" ng-init="packCtrl.init(<?php echo get_packs(); ?>)" ng-show="packCtrl.isVisible()">
    <h2>¡Aprovecha nuestros paquetes!</h2>
    <p ng-show="packCtrl.isPacksListVisible()">Es necesario que adquieras entrenamientos para poder reservar.</p>
    <p ng-show="!packCtrl.isPacksListVisible()">
        ¡Ahora cuentas con entrenamientos disponibles. Ya puedes reservar tu estación!
    </p>
    <a href="<?php echo site_url('reserva'); ?>" ng-show="!packCtrl.isPacksListVisible()" class="button-red">Reserva ahora</a>
    <ul class="packs-list" ng-show="packCtrl.isPacksListVisible()">
        <li ng-repeat="pack in packCtrl.packs" ng-class="{ 'selected' : packCtrl.isSelectedPack(pack), 'special' : packCtrl.isSpecialPack(pack) }">
            <a ng-click="packCtrl.selectPack(pack)" ng-if="packCtrl.isSpecialPack(pack)">
                <span class="pack-description"><icon class="special-icon"></icon></span>
                <span class="pack-description">{{ pack.getDescription() }}</span>
                <span class="pack-promo-price">{{ pack.getPrice() | currency:"$" }}</span>
                <span class="pack-price">{{ pack.getSpecialPrice() | currency:"$" }}</span>
                <span class="pack-expiration">Expira en {{ pack.getExpiration() }} días</span>
                <span class="pack-button-more">+</span>
                <span class="tooltip">Por ser tu primer entrenamiento, recibe un precio especial</span>
            </a>
            <a ng-click="packCtrl.selectPack(pack)" ng-if="!packCtrl.isSpecialPack(pack)">
                <span class="pack-name">{{ pack.getClasses() }}</span>
                <span class="pack-description">{{ pack.getDescription() }}</span>
                <span class="pack-price">{{ pack.getPrice() | currency:"$" }}</span>
                <span class="pack-expiration">Expira en {{ pack.getExpiration() }} días</span>
                <span class="pack-button-more">+</span>
            </a>
        </li>
    </ul>
    <div ng-show="packCtrl.isPacksListVisible()" class="actions">
        <a href="" class="close-link" ng-click="packCtrl.closePacks()">Regresar al salón</a>
    </div>
</div>