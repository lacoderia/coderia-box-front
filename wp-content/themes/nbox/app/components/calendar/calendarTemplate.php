<?php
    wp_enqueue_script( 'InstructorService' );
    wp_enqueue_script( 'CalendarService' );
    wp_enqueue_script( 'CalendarController' );

?>

<div id="calendar" ng-controller="CalendarController as calendarCtrl" ng-init="calendarCtrl.init(<?php echo get_schedule_types() . ', ' . get_instructors() . ', ' . get_weekly_schedule(); ?>)" ng-show="calendarCtrl.isVisible()" class="calendar-component animate-visibility">
    <h2>Reserva tu lugar</h2>
    <p class="et_pb_text_align_center">Selecciona un horario</p>
    <div class="calendar">
        <div class="calendar-filters">
            <span class="week-label">{{ ::calendarCtrl.getWeekLabel() }}</span>
            <span class="week-filters">
                <div>
                    <label>Entrenamiento:</label>
                    <select class="filter" ng-model="calendarCtrl.selectedScheduleType" ng-options="scheduleType.getDescription() for scheduleType in calendarCtrl.scheduleTypes track by scheduleType.getId()">
                        <option value="">Todos</option>
                    </select>
                </div>
                <div style="margin-top: 10px;">
                    <label>Instructor:</label>
                    <select class="filter" ng-model="calendarCtrl.selectedInstructor" ng-options="instructor.getName() for instructor in calendarCtrl.instructors track by instructor.getId()">
                        <option value="">Todos</option>
                    </select>
                </div>
            </span>
        </div>

        <!-- Desktop version -->
        <ul ng-if="!calendarCtrl.isMobile()" ng-cloak>
            <li ng-repeat="day in calendarCtrl.week" class="day">
                <div class="day-title">
                    <span class="day-number">{{ ::day.getDate().date() }}</span>
                    <span class="day-label"> {{ ::calendarCtrl.getDayOfWeek(day.getDate().day()) }}</span>
                </div>
                <ul>
                    <li ng-repeat="boxClass in day.getBoxClasses() | classByInstructor:calendarCtrl.selectedInstructor | classByScheduleType:calendarCtrl.selectedScheduleType | orderByDate" class="class" ng-class="{ 'enabled': calendarCtrl.isClassEnabled(boxClass), 'disabled': !calendarCtrl.isClassEnabled(boxClass), 'selectable': calendarCtrl.isClassSelectable(boxClass), 'special': boxClass.getDescription() }" ng-click="calendarCtrl.selectBoxClass(boxClass)">
                        <div class="ribbon" ng-if="::boxClass.getIsFree()"><span>GRATIS</span></div>
                        <div class="ribbon" ng-if="::boxClass.getIsOpening()"><span>APERTURA</span></div>
                        <span class="class-instructor">{{ ::boxClass.getInstructorName() }}</span>
                        <span class="class-time">{{ ::boxClass.getDate().format('H:mm')}}</span>
                        <span class="class-description" ng-if="calendarCtrl.isClassEnabled(boxClass)">{{ ::boxClass.getScheduleType().getDescription() }}</span>
                        <span class="class-dj" ng-if="calendarCtrl.isClassEnabled(boxClass) && boxClass.getDescription()"><span>{{ ::boxClass.getDescription() }}</span></span>
                        <span class="class-title" ng-if="!calendarCtrl.isClassEnabled(boxClass)">{{ ::boxClass.getAvailableSeatsMessage() }}</span>
                    </li>
                </ul>
            </li>
        </ul>

        <!-- Mobile version -->
        <ul ng-if="calendarCtrl.isMobile()" ng-cloak>
            <li ng-repeat="day in calendarCtrl.week" class="day" ng-click="calendarCtrl.setSelectedDay(day)" ng-class="{ 'selected': calendarCtrl.isSameDay(day, calendarCtrl.selectedDay) }">
                <div class="day-title">
                    <span class="day-number">{{ ::day.getDate().date() }}</span>
                    <span class="day-label"> {{ ::calendarCtrl.getDayOfWeek(day.getDate().day()) }}</span>
                </div>
            </li>
        </ul>
        <ul ng-if="calendarCtrl.isMobile()" class="classes-container">
            <li ng-repeat="boxClass in calendarCtrl.selectedDay.getBoxClasses() | classByInstructor:calendarCtrl.selectedInstructor | orderByDate" class="class" ng-class="{ 'enabled': calendarCtrl.isClassEnabled(boxClass), 'disabled': !calendarCtrl.isClassEnabled(boxClass), 'selectable': calendarCtrl.isClassSelectable(boxClass), 'special': boxClass.getDescription() }" ng-click="calendarCtrl.selectBoxClass(boxClass)">
                <div class="ribbon" ng-if="::boxClass.getIsFree()"><span>GRATIS</span></div>
                <div class="ribbon" ng-if="::boxClass.getIsOpening()"><span>APERTURA</span></div>
                <span class="class-instructor">{{ ::boxClass.getInstructorName() }}</span>
                <span class="class-time">{{ ::boxClass.getDate().format('H:mm')}}</span>
                <span class="class-description" ng-if="calendarCtrl.isClassEnabled(boxClass)">{{ ::boxClass.getScheduleType().getDescription() }}</span>
                <span class="class-dj" ng-if="calendarCtrl.isClassEnabled(boxClass) && boxClass.getDescription()"><span>{{ ::boxClass.getDescription() }}</span></span>
                <span class="class-title" ng-if="!calendarCtrl.isClassEnabled(boxClass)">{{ ::boxClass.getAvailableSeatsMessage() }}</span>
            </li>
            <li ng-if="!calendarCtrl.selectedDay.getBoxClasses().length" >
                La búsqueda no trajo resultados
            </li>
        </ul>
    </div>
</div>