<?php
    wp_enqueue_script( 'SyncService' );
    wp_enqueue_script( 'SyncController' );

    global $nbici_url;

?>

<div id="sync" ng-controller="SyncController as syncCtrl" class="sync-component animate-visibility" ng-init="syncCtrl.init()">
    <span us-spinner spinner-key="step-spinner"></span>
    <div ng-show="syncCtrl.userIsSynced()">
        <h2>¡Tu cuenta ya esta sincronizada!</h2>
        <p>Esto significa que puedes usar tus clases para reservar entrenamientos en Nbox o clases en NBici.</p>
        <a href="<?php echo site_url('reserva'); ?>" class="button-red">Reserva ahora</a>
    </div>
    <div ng-show="!syncCtrl.userIsSynced()">
        <h2>¿Qué beneficios obtienes al sincronizar tu cuenta?</h2>
        <p>Al sincronizar tu cuenta con NBici podrás usar tus clases para reservar entrenamientos en Nbox o clases en NBici. En tres sencillos pasos puedes disfrutar de este beneficio:</p>
        <div class="steps-maxi-container">
            <step ng-show="syncCtrl.showStep(0)">
                <h3>1. Inicia sesión con tu cuenta de NBici</h3>
                <div class="step-container">
                    <p>Primero necesitamos validar tu usuario de NBici</p>
                    <form novalidate name="syncCtrl.loginForm" class="form" ng-submit="syncCtrl.remoteLogin()">
                        <fieldset>
                            <span ng-show="syncCtrl.formErrorMessage" class="required-message error-message">{{ syncCtrl.formErrorMessage }}</span>
                            <div class="required-message" ng-show="syncCtrl.loginForm.$submitted || syncCtrl.loginForm.loginEmail.$touched">
                                <span ng-show="syncCtrl.loginForm.loginEmail.$error.required">El correo electrónico es requerido.</span>
                                <span ng-show="syncCtrl.loginForm.loginEmail.$error.email">El correo electrónico no es válido.</span>
                            </div>
                            <input type="email" placeholder="correo electrónico" name="loginEmail" ng-model="syncCtrl.credentials.email" required>
                            <div class="required-message" ng-show="syncCtrl.loginForm.$submitted || syncCtrl.loginForm.loginPassword.$touched">
                                <div ng-show="syncCtrl.loginForm.loginPassword.$error.required">El password es requerido.</div>
                            </div>
                            <input type="password" placeholder="password" name="loginPassword" ng-model="syncCtrl.credentials.password" required>
                        </fieldset>
                        <fieldset>
                            <button style="margin-bottom:2rem;">continuar</button>
                            <a href="<?php echo $nbici_url; ?>?view=signup" ng-click="loginCtrl.showView(loginCtrl.VIEWS.LOGIN)">¿No tienes cuenta en NBici?</a>
                        </fieldset>
                    </form>
                </div>
            </step>
            <step ng-show="syncCtrl.showStep(1)">
                <h3>2. Elige tu usuario</h3>
                <div class="step-container">
                    <p>Ahora selecciona el correo electrónico con el que deseas acceder a NBici y Nbox:</p>
                    <div>
                        <button class="email-button" ng-repeat="email in syncCtrl.getAvailableEmails()" ng-click="syncCtrl.setNewEmail(email)">{{email}}</button>
                    </div>
                </div>
            </step>
            <step ng-show="syncCtrl.showStep(2)">
                <h3>3. Elige un nuevo password</h3>
                <div class="step-container">
                    <p>Por último, introduce el password que deseas usar para acceder a NBici y Nbox</p>
                    <form novalidate name="syncCtrl.passwordForm" class="form" ng-submit="syncCtrl.synchronizeUser()">
                        <fieldset>
                            <span ng-show="syncCtrl.formErrorMessage" class="required-message error-message">{{ syncCtrl.formErrorMessage }}</span>
                            <div class="required-message" ng-show="syncCtrl.passwordForm.$submitted || syncCtrl.passwordForm.newPassword.$touched">
                                <div ng-show="syncCtrl.passwordForm.newPassword.$error.required">El password es requerido.</div>
                                <div ng-show="syncCtrl.passwordForm.newPassword.$error.minlength">El password debe tener una longitud mínima de 8 caracteres.</div>
                            </div>
                            <input type="password" placeholder="password" name="newPassword" ng-model="syncCtrl.newCredentials.password" minlength="8" required>
                            <div class="required-message" ng-show="syncCtrl.passwordForm.$submitted || syncCtrl.passwordForm.newPasswordConfirmation.$touched">
                                <div ng-show="syncCtrl.passwordForm.newPasswordConfirmation.$error.required">La confirmación del password es requerida.</div>
                                <div ng-show="syncCtrl.passwordForm.newPasswordConfirmation.$error.pwCheck && !syncCtrl.passwordForm.newPasswordConfirmation.$error.required">El password y la confirmación deben ser iguales.</div>
                            </div>
                            <input type="password" placeholder="confirmar password" name="newPasswordConfirmation" ng-model="syncCtrl.newCredentials.passwordConfirmation" pw-check="syncCtrl.newCredentials.password" required>
                        </fieldset>
                        <fieldset>
                            <button style="margin-bottom:2rem;">sincronizar</button>
                        </fieldset>
                    </form>
                </div>
            </step>
            <step ng-show="syncCtrl.showStep(3)">
                <h3>¡Hemos terminado!</h3>
                <div class="step-container">
                    <p>A partir de este momento podrás usar tus clases para reservar entrenamientos en Nbox o clases en NBici.</p>
                    <a href="<?php echo site_url('reserva'); ?>" class="button-red">Reserva ahora</a>
                </div>
            </step>
        </div>
    </div>
</div>