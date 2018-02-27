<?php
    wp_enqueue_script( 'SyncService' );
    wp_enqueue_script( 'SyncController' );

?>

<div id="sync-link" ng-controller="SyncController as syncCtrl" class="sync-component" ng-init="syncCtrl.init()">
    <h2>¿Sabías que ahora puedes usar tus clases en NBici?</h2>
    <p>Las clases que compras en Nbox pueden ser utilizadas en NBici</p>
    <a class="cool-button" style="margin-top:40px" ng-click="syncCtrl.goToSyncPage()">más información</a>
</div>