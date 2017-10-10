<div class="resume-module" ng-controller="HistoryController as historyCtrl" ng-init="historyCtrl.init(<?php echo get_appointments_history(); ?>)">
    <p class="module-name">{{ profileCtrl.MODULES.HISTORY.name }}</p>
    <div class="no-items" ng-if="!historyCtrl.hasAppointmentHistory()">
        <div class="title">No has tomado ningún entrenamiento</div>
        <a href="<?php echo site_url() ?>/reserva">Ir a reserva de entrenamientos</a>
    </div>
    <div class="history-classes" ng-if="historyCtrl.hasAppointmentHistory()">
        <ticket ng-repeat="appointment in historyCtrl.appointmentHistory | orderByDate:true" class="{{ historyCtrl.APPOINTMENT_STATUS[appointment.getStatus()].class }}">
            <div class="ticket-date">
                <span class="hour">{{ ::appointment.getDate().format('H:mm') }}</span>
                <span class="day">{{ ::appointment.getDate().format('MMMM D') }}</span>
                <span class="status {{ historyCtrl.APPOINTMENT_STATUS[appointment.getStatus()].class }}">
                    <span ng-if="appointment.getStatus() == 'BOOKED'">{{ historyCtrl.APPOINTMENT_STATUS.IN_PROGRESS.name }}</span>
                    <span ng-if="appointment.getStatus() != 'BOOKED'">{{ historyCtrl.APPOINTMENT_STATUS[appointment.getStatus()].name }}</span>
                </span>
            </div>
            <div class="station-info">
                <div>
                    <div class="station-info-container">
                        <span class="label">Estación:</span>
                        <span class="data" ng-bind="appointment.getStationNumber()"></span>
                    </div>
                    <div class="station-info-container">
                        <span class="label">Instructor:</span>
                        <span class="data">{{ ::appointment.getInstructorName() }}</span>
                    </div>
                    <div class="station-info-container">
                        <span class="label">Entrenamiento:</span>
                        <span class="data">{{ ::appointment.getBoxClass().getScheduleType().getDescription() }}</span>
                    </div>
                </div>
            </div>
        </ticket>
    </div>
</div>