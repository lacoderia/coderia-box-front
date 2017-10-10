<?php
    wp_enqueue_script( 'Station' );
    wp_enqueue_script( 'ClassroomService' );
    wp_enqueue_script( 'ClassroomController' );
?>

<div id="classroom" class="classroom-component animate-visibility" ng-controller="ClassroomController as classroomCtrl" ng-show="classroomCtrl.isVisible()">
    <h2>Reserva tu lugar</h2>
    <p>Selecciona una estación</p>
    <div class="classroom-container">
        <div class="station-instructor"><span>{{ classroomCtrl.getInstructorName() }}</span></div>
        <ul ng-repeat="rows in classroomCtrl.distribution">
            <li class="station-container" ng-repeat="station in rows" ng-click="classroomCtrl.selectStation(station)" ng-class="[classroomCtrl.getStationClass(station), station.getStyle()]">
                <div class="station" ng-if="station.getStatus() != DEFAULT_VALUES.STATION_STATUS.INACTIVE">
                    <div class="station-number">{{ station.getNumber() }}</div>
                </div>
                <div class="station-description">{{ station.getDescription() }}</div>
            </li>
        </ul>
        <div class="actions">
            <a href="" class="close-link" ng-click="classroomCtrl.closeClassroom()">Regresar a los horarios</a>
        </div>
        <span class="door">Entrada</span>
        <span class="dj">{{ classroomCtrl.getBoxClassDescription() ? classroomCtrl.getBoxClassDescription() : 'DJ' }}</span>
        <img src="<?php echo get_stylesheet_directory_uri() . '/images/fan_icon.png'; ?>" class="fan fan-1">
        <img src="<?php echo get_stylesheet_directory_uri() . '/images/fan_icon.png'; ?>" class="fan fan-2">
        <img src="<?php echo get_stylesheet_directory_uri() . '/images/fan_icon.png'; ?>" class="fan fan-3">
    </div>
</div>