<?php
    wp_enqueue_script( 'Pack' );
    wp_enqueue_script( 'PackService' );
    wp_enqueue_script( 'PackController' );

?>

<div id="packs" ng-controller="PackController as packCtrl" class="pack-component" ng-init="packCtrl.init(<?php echo get_packs(); ?>)" ng-show="packCtrl.isVisible()">
    <h2>¡Aprovecha nuestros paquetes!</h2>
    <p>¡Se parte de Nbox! Selecciona tu paquete favorito y compra online.</p>
    <ul class="packs-list">
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
    <!-- Sync Link -->
    <?php locate_template( array( 'app/components/sync/syncLinkTemplate.php' ), true, true ); ?>
</div>