<?php
    wp_enqueue_script( 'LoginController' );
?>

<div ng-controller="LoginController as loginCtrl" ng-init="loginCtrl.init()">
    <div id="overlay" ng-show="loginCtrl.isModalVisible()" ng-click="loginCtrl.hideModal()"></div>
    <div id="login-component" ng-show="loginCtrl.isModalVisible()">
        <span us-spinner spinner-key="login-spinner"></span>
        <div class="login-container" ng-show="loginCtrl.isCurrentView(loginCtrl.VIEWS.LOGIN) || loginCtrl.isCurrentView(loginCtrl.VIEWS.SIGNUP)">
            <div class="signup-form" ng-show="loginCtrl.isCurrentView(loginCtrl.VIEWS.SIGNUP)">
                <h2 class="section-title">Registrarte a Nbox</h2>
                <form novalidate name="loginCtrl.signupForm" class="form" ng-submit="loginCtrl.signUp()">
                    <fieldset>
                        <span ng-show="loginCtrl.formErrorMessage" class="required-message error-message ">{{ loginCtrl.formErrorMessage }}</span>
                        <div ng-show="loginCtrl.signupForm.$submitted || loginCtrl.signupForm.signupFirstName.$touched">
                            <span class="required-message message-input" ng-show="loginCtrl.signupForm.signupFirstName.$error.required">El nombre es requerido.</span>
                        </div>
                        <input type="text" placeholder="nombres" name="signupFirstName" ng-model="loginCtrl.newUser.firstName" required>
                        <div class="required-message" ng-show="loginCtrl.signupForm.$submitted || loginCtrl.signupForm.signupLastName.$touched">
                            <span ng-show="loginCtrl.signupForm.signupLastName.$error.required">Los apellidos son requeridos.</span>
                        </div>
                        <input type="text" placeholder="apellidos" name="signupLastName" ng-model="loginCtrl.newUser.lastName" required>
                        <div class="required-message" ng-show="loginCtrl.signupForm.$submitted || loginCtrl.signupForm.signupEmail.$touched">
                            <span ng-show="loginCtrl.signupForm.signupEmail.$error.required">El correo electrónico es requerido.</span>
                            <span ng-show="loginCtrl.signupForm.signupEmail.$error.email">El correo electrónico no es válido.</span>
                        </div>
                        <input type="email" placeholder="correo electrónico" name="signupEmail" ng-model="loginCtrl.newUser.email" required>
                        <div class="required-message" ng-show="loginCtrl.signupForm.$submitted || loginCtrl.signupForm.signupPassword.$touched">
                            <div ng-show="loginCtrl.signupForm.signupPassword.$error.required">El password es requerido.</div>
                            <div ng-show="loginCtrl.signupForm.signupPassword.$error.minlength">El password debe tener una longitud mínima de 8 caracteres.</div>
                        </div>
                        <input type="password" placeholder="password" name="signupPassword" ng-model="loginCtrl.newUser.password" minlength="8" required>
                        <div class="required-message" ng-show="loginCtrl.signupForm.$submitted || loginCtrl.signupForm.signupConfirmation.$touched">
                            <div ng-show="loginCtrl.signupForm.signupConfirmation.$error.required">La confirmación del password es requerida.</div>
                            <div ng-show="loginCtrl.signupForm.signupConfirmation.$error.pwCheck && !loginCtrl.signupForm.signupConfirmation.$error.required">El password y la confirmación deben ser iguales.</div>
                        </div>
                        <input type="password" placeholder="confirmar password" name="signupConfirmation" ng-model="loginCtrl.newUser.passwordConfirmation" pw-check="loginCtrl.newUser.password" required>
                    </fieldset>
                    <fieldset>
                        <button class="button-login">registrar</button>
                        <a href="" ng-click="loginCtrl.showView(loginCtrl.VIEWS.LOGIN)">¿Ya eres socio y tienes una cuenta registrada?</a>
                    </fieldset>
                </form>
            </div>
            <div class="login-form" ng-show="loginCtrl.isCurrentView(loginCtrl.VIEWS.LOGIN)">
                <form novalidate name="loginCtrl.loginForm" class="form" ng-submit="loginCtrl.login()">
                    <fieldset>
                        <span ng-show="loginCtrl.formErrorMessage" class="required-message error-message">{{ loginCtrl.formErrorMessage }}</span>
                        <div class="required-message" ng-show="loginCtrl.loginForm.$submitted || loginCtrl.loginForm.loginEmail.$touched">
                            <span ng-show="loginCtrl.loginForm.loginEmail.$error.required">El correo electrónico es requerido.</span>
                            <span ng-show="loginCtrl.loginForm.loginEmail.$error.email">El correo electrónico no es válido.</span>
                        </div>
                        <input type="email" placeholder="correo electrónico" name="loginEmail" ng-model="loginCtrl.credentials.email" required>
                        <div class="required-message" ng-show="loginCtrl.loginForm.$submitted || loginCtrl.loginForm.loginPassword.$touched">
                            <div ng-show="loginCtrl.loginForm.loginPassword.$error.required">El password es requerido.</div>
                        </div>
                        <input type="password" placeholder="password" name="loginPassword" ng-model="loginCtrl.credentials.password" required>
                    </fieldset>
                    <fieldset>
                        <button class="button-login">iniciar sesión</button>
                        <div>
                            <a href="" ng-click="loginCtrl.showView(loginCtrl.VIEWS.SIGNUP)">¿Eres nuevo y no tienes una cuenta?</a>
                            <a href="" ng-click="loginCtrl.showView(loginCtrl.VIEWS.FORGOT)">¿Olvidaste tu contraseña?</a>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
        <div class="forgot-container" ng-show="loginCtrl.isCurrentView(loginCtrl.VIEWS.FORGOT) || loginCtrl.isCurrentView(loginCtrl.VIEWS.RESET)">
            <div class="forgot-form" ng-show="loginCtrl.isCurrentView(loginCtrl.VIEWS.FORGOT)">
                <form novalidate name="loginCtrl.forgotForm" class="form" ng-submit="loginCtrl.recoverPassword()">
                    <fieldset>
                        <span ng-show="loginCtrl.formErrorMessage" class="required-message error-message">{{ loginCtrl.formErrorMessage }}</span>
                        <p>Proporciona tu correo electrónico registrado</p>
                        <div class="required-message" ng-show="loginCtrl.forgotForm.$submitted || loginCtrl.forgotForm.forgotEmail.$touched">
                            <span ng-show="loginCtrl.forgotForm.forgotEmail.$error.required">El correo electrónico es requerido.</span>
                            <span ng-show="loginCtrl.forgotForm.forgotEmail.$error.email">El correo electrónico no es válido.</span>
                        </div>
                        <input type="email" placeholder="correo electrónico" name="forgotEmail" ng-model="loginCtrl.forgot.email" required>
                    </fieldset>
                    <fieldset>
                        <button class="button-login">recuperar</button>
                        <a href="" ng-click="loginCtrl.showView(loginCtrl.VIEWS.LOGIN)">Cancelar</a>
                    </fieldset>
                </form>
            </div>
            <div class="forgot-form" ng-show="loginCtrl.isCurrentView(loginCtrl.VIEWS.RESET)">
                <form novalidate name="loginCtrl.resetForm" class="form" ng-submit="loginCtrl.resetPassword()">
                    <fieldset>
                        <p>Introduce una nueva contraseña para tu cuenta</p>
                        <div class="required-message" ng-show="loginCtrl.resetForm.$submitted || loginCtrl.resetForm.resetPassword.$touched">
                            <div ng-show="loginCtrl.resetForm.resetPassword.$error.required">El password es requerido.</div>
                            <div ng-show="loginCtrl.resetForm.resetPassword.$error.minlength">El password debe tener una longitud mínima de 8 caracteres.</div>
                        </div>
                        <input type="password" placeholder="Password" name="resetPassword" ng-model="loginCtrl.reset.password" minlength="8" required>
                        <div class="required-message" ng-show="loginCtrl.resetForm.$submitted || loginCtrl.resetForm.resetConfirmation.$touched">
                            <div ng-show="loginCtrl.resetForm.resetConfirmation.$error.required">La confirmación del password es requerida.</div>
                            <div ng-show="loginCtrl.resetForm.resetConfirmation.$error.pwCheck && !loginCtrl.resetForm.resetConfirmation.$error.required">El password y la confirmación deben ser iguales.</div>
                        </div>
                        <input type="password" placeholder="Confirmar password" name="resetConfirmation" ng-model="loginCtrl.reset.passwordConfirmation" pw-check="loginCtrl.reset.password" required>
                    </fieldset>
                    <fieldset>
                        <button class="button-login">cambiar contraseña</button>
                        <a href="" ng-click="loginCtrl.showView(loginCtrl.VIEWS.LOGIN)">Cancelar</a>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>
