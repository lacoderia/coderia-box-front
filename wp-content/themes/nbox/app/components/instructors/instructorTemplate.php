<?php

    wp_enqueue_script( 'InstructorService' );
    wp_enqueue_script( 'InstructorController' );

?>

<div ng-controller="InstructorController as instructorCtrl" ng-init="instructorCtrl.init(<?php echo get_instructors(); ?>)" class="instructors-component">
    <h2>¡Conoce a nuestro equipo!</h2>

    <!-- Desktop version -->
    <slick dots="false" infinite="true" slides-to-show="5" speed="300" arrows="true" ng-if="!instructorCtrl.isMobile()">
        <div ng-repeat="instructor in instructorCtrl.getInstructors()" class="instructor" ng-mouseover="instructorCtrl.changeQuote(instructor)" ng-mouseout="instructorCtrl.changeQuote()" ng-style="instructor.getClassName()" ng-click="instructorCtrl.showInstructorProfile(instructor.getId())">
            <span class="instructors-quote">{{ instructor.getQuote() }}</span>
            <span class="instructors-name">{{ instructor.getName() }}</span>
        </div>
    </slick>

    <!-- Mobile version -->
    <slick class="mobile-slick" dots="false" infinite="false" slides-to-show="1" speed="300" arrows="true" settings="instructorCtrl.slickConfig" ng-if="instructorCtrl.isMobile()">
        <div ng-repeat="instructor in instructorCtrl.getInstructors()" class="instructor" ng-style="instructor.getClassName()" ng-click="instructorCtrl.showInstructorProfile(instructor.getId())">
            <span class="instructors-quote">{{ instructor.getQuote() }}</span>
            <span class="instructors-name">{{ instructor.getName() }}</span>
        </div>
    </slick>
</div>
