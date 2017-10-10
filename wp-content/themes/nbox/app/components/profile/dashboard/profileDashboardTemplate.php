
<div ng-controller="AccountController as accountCtrl" ng-cloak>
    <user> 
        <div class="user-image icon-user"></div> 
        <div class="user-info">
            <span class="user-name">{{ accountCtrl.getUserName() }}</span>
            <span class="user-mail">{{ accountCtrl.getUserEmail() }}</span>
            <a href="" class="button" ng-click="profileCtrl.events.selectModule(profileCtrl.MODULES.PERSONAL_INFO)">Editar</a>
        </div> 
    </user>
    <ul class="resume">
        <li>
            <span class="digit">{{ accountCtrl.getUserClassesLeft() }}</span>
            <span class="label">Entrenamientos disponibles</span>
        </li>
        <li>
            <span class="digit">{{ accountCtrl.getUserBalance() | currency:"$" }}</span>
            <span class="label">Saldo a favor</span>
        </li>
    </ul>
</div>
<div class="resume-module" ng-controller="HistoryController as historyCtrl" ng-init="historyCtrl.initDashboard(<?php echo get_future_appointments(); ?>)">
    <p class="module-name">Próximos entrenamientos reservados</p>
    <div class="history-classes" id="history-classes">
        <span us-spinner spinner-key="future-appointments-spinner"></span>
        <div class="no-items" ng-if="!historyCtrl.hasFutureAppointments()">
            <div class="title">No tienes próximos entrenamientos</div>
            <a href="<?php echo site_url() ?>/reserva">Ir a reserva de entrenamientos</a>
        </div>
        <div class="history-classes animate-visibility" ng-if="historyCtrl.hasFutureAppointments()" ng-show="historyCtrl.isVisible()">
            <ticket ng-repeat="appointment in historyCtrl.futureAppointments | orderByDate | orderBy:'getStatus()' " class="{{ historyCtrl.APPOINTMENT_STATUS[appointment.getStatus()].class }}">
                <div class="ticket-date">
                    <span class="hour">{{ ::appointment.getDate().format('H:mm') }}</span>
                    <span class="day">{{ ::appointment.getDate().format('MMMM D') }}</span>
                    <span class="status {{ historyCtrl.APPOINTMENT_STATUS[appointment.getStatus()].class }}">{{ historyCtrl.APPOINTMENT_STATUS[appointment.getStatus()].name }}</span>
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
                <div class="actions-overlay animate-visibility" ng-show="historyCtrl.isSelectedAppointment(appointment)">
                    <a class="action-button appointment-cancel" title="Cancelar reservación" ng-click="historyCtrl.cancelAppointment(appointment)" ng-show="appointment.getStatus() != 'CANCELLED' && historyCtrl.isAppointmentEnabled(appointment)"> Cancelar Reservación</a>
                    <a class="action-button appointment-change" title="Cambiar estación" ng-click="historyCtrl.changeStation(appointment)" ng-show="appointment.getStatus() != 'CANCELLED' && historyCtrl.isAppointmentEditable(appointment)"> Cambiar estación</a>
                </div>
                <span class="more animate-visibility" title="Opciones" ng-click="historyCtrl.selectAppointment(appointment)" ng-show="!historyCtrl.isSelectedAppointment(appointment) && appointment.getStatus() != 'CANCELLED' && historyCtrl.isAppointmentEditable(appointment)">editar</span>
                <icon class="close animate-visibility" title="Cerrar" ng-click="historyCtrl.selectAppointment(undefined)" ng-show="historyCtrl.isSelectedAppointment(appointment)"></icon>
            </ticket>
            <div>
                <a class="button" ng-click="profileCtrl.events.selectModule(profileCtrl.MODULES.HISTORY)" ng-if="historyCtrl.hasFutureAppointments()">Ver todas</a>
            </div>
        </div>
        <div>
            <?php locate_template( array( 'app/components/classroom/editClassroomTemplate.php' ), true, true ); ?>
            <?php locate_template( array( 'app/components/booking/editBookingTemplate.php' ), true, true ); ?>
        </div>
    </div>
</div>
<div class="resume-module" ng-controller="DashboardController as dashboardCtrl" ng-cloak>
    <p class="module-name">Código de promoción</p>
    <div class="social-activity">
        <span us-spinner spinner-key="social-spinner"></span>
        <div class="border-container" ng-class="{ true:'no-border' }[dashboardCtrl.isMailFormVisible()]">
            <h4><span>Comparte ahora y gana</span> <span class="price">${{dashboardCtrl.getUserCouponValue()}}</span></h4>
            <p>Comparte tu cupón con amigos; ellos y tú recibirán {{dashboardCtrl.getUserCouponValue() | currency:"$"}} de descuento para tu próximo entrenamiento</p>
            <div class="coupon">{{dashboardCtrl.getUserCoupon()}}</div>
            <!--span ng-if="dashboardCtrl.social.used">Cuentas con ${{dashboardCtrl.social.credit}}</span-->
            <!--span ng-if="!dashboardCtrl.social.used">Tus amigos aun no han usado tu código</span-->
            <h5>Comparte ahora:</h5>
            <div class="a2a_kit a2a_kit_size_32 addtoany_list a2a_default_style">
                <a>
                    <span class="a2a_svg a2a_s__default a2a_s_facebook" ng-click="dashboardCtrl.shareFB()">
                        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M17.78 27.5V17.008h3.522l.527-4.09h-4.05v-2.61c0-1.182.33-1.99 2.023-1.99h2.166V4.66c-.375-.05-1.66-.16-3.155-.16-3.123 0-5.26 1.905-5.26 5.405v3.016h-3.53v4.09h3.53V27.5h4.223z"></path></svg>
                    </span>
                </a>
                <a class="a2a_button_twitter"></a>
                <a>
                    <span class="a2a_svg a2a_s__default a2a_s_email" ng-click="dashboardCtrl.showMailForm()">
                        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M26 21.25v-9s-9.1 6.35-9.984 6.68C15.144 18.616 6 12.25 6 12.25v9c0 1.25.266 1.5 1.5 1.5h17c1.266 0 1.5-.22 1.5-1.5zm-.015-10.765c0-.91-.265-1.235-1.485-1.235h-17c-1.255 0-1.5.39-1.5 1.3l.015.14s9.035 6.22 10 6.56c1.02-.395 9.985-6.7 9.985-6.7l-.015-.065z"></path></svg>
                    </span>
                </a>
            </div>
            <div class="actions-overlay animate-visibility" ng-show="dashboardCtrl.isMailFormVisible()">
                <form novalidate name="dashboardCtrl.mailForm" class="form" ng-submit="dashboardCtrl.sendMail()">
                    <fieldset>
                        <span ng-show="dashboardCtrl.formErrorMessage" class="required-message error-message">{{ dashboardCtrl.formErrorMessage }}</span>
                        <p>¿A quién quieres compartirle tu cupón?</p>
                        <div class="required-message" ng-show="dashboardCtrl.mailForm.$submitted || dashboardCtrl.mailForm.email.$touched">
                            <span ng-show="dashboardCtrl.mailForm.email.$error.required">El correo electrónico es requerido.</span>
                            <span ng-show="dashboardCtrl.mailForm.email.$error.email">El correo electrónico no es válido.</span>
                        </div>
                        <input type="email" placeholder="correo electrónico" name="email" ng-model="dashboardCtrl.sharing.email" required>
                    </fieldset>
                    <fieldset>
                        <button class="action-button" title="Enviar cupón">enviar cupón </button>
                    </fieldset>
                </form>
            </div>
            <icon class="close animate-visibility" title="Cerrar" ng-click="dashboardCtrl.hideMailForm()" ng-show="dashboardCtrl.isMailFormVisible()"></icon>
        </div>
    </div>
</div>



