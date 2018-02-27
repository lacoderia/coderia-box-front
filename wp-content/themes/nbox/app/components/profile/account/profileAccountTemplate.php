<p class="module-name">{{ profileCtrl.MODULES.PERSONAL_INFO.name }}</p>

<div ng-controller="AccountController as accountCtrl" class="account-module"> 
    <span us-spinner spinner-key="account-spinner"></span>
    <form novalidate name="accountCtrl.infoForm" class="form special-form active" ng-submit="accountCtrl.updateInfo()">
        <div class="title">Datos personales</div>
        <div class="info">
            <div class="info-row">
                <div class="info-cell full-width">
                    <input type="text" placeholder="Nombre" name="infoFirstName" ng-model="accountCtrl.user.firstName" required>
                    <div class="required-message" ng-show="accountCtrl.infoForm.$submitted || accountCtrl.infoForm.infoFirstName.$touched">
                        <span ng-show="accountCtrl.infoForm.infoFirstName.$error.required">El nombre es requerido.</span>
                    </div>
                </div>
            </div>
            <div class="info-row">
                <div class="info-cell full-width">
                    <input type="text" placeholder="Apellidos" name="infoLastName" ng-model="accountCtrl.user.lastName" required>
                    <div class="required-message" ng-show="accountCtrl.infoForm.$submitted || accountCtrl.infoForm.infoLastName.$touched">
                        <span ng-show="accountCtrl.infoForm.infoLastName.$error.required">Los apellidos son requeridos.</span>
                    </div>
                </div>
            </div>
            <div class="info-row">
                <div class="info-cell full-width">
                    <button class="button-red">actualizar</button>
                </div>
            </div>
        </div>

    </form>

    <form novalidate name="accountCtrl.resetForm" class="form special-form active" ng-submit="accountCtrl.updatePassword()">
        <div class="title">Contraseña</div>
        <div class="info">
            <div class="info-row">
                <div style="font-size: 0.8rem; font-weight: 700;" ng-show="accountCtrl.userIsSynced()">La contraseña también se actualizará en tu cuenta de NBici</div>
            </div>
            <div class="info-row">
                <div class="info-cell full-width">
                    <input type="password" placeholder="Contraseña" name="resetPassword" ng-model="accountCtrl.user.password" minlength="8" required>
                    <div class="required-message" ng-show="accountCtrl.resetForm.$submitted || accountCtrl.resetForm.resetPassword.$touched">
                        <span ng-show="accountCtrl.resetForm.resetPassword.$error.required">La contraseña es requerida.</span>
                        <span ng-show="accountCtrl.resetForm.resetPassword.$error.minlength">La contraseña debe tener una longitud mínima de 8 caracteres.</span>
                    </div>
                </div>
            </div>
            <div class="info-row">
                <div class="info-cell full-width">
                    <input type="password" placeholder="Confirmar contraseña" name="resetConfirmation" ng-model="accountCtrl.user.passwordConfirmation" pw-check="accountCtrl.user.password" required>
                    <div class="required-message" ng-show="accountCtrl.resetForm.$submitted || accountCtrl.resetForm.resetConfirmation.$touched">
                        <span ng-show="accountCtrl.resetForm.resetConfirmation.$error.required">La confirmación del password es requerida.</span>
                        <span ng-show="accountCtrl.resetForm.resetConfirmation.$error.pwCheck && !accountCtrl.resetForm.resetConfirmation.$error.required">La contraseña y la confirmación deben ser iguales.</span>
                    </div>
                </div>
            </div>
            <div class="info-row">
                <div class="info-cell full-width">
                    <button class="button-red">cambiar contraseña</button>
                </div>
            </div>
        </div>
    </form>
</div>