<?php
/*****************************************************************************************
 * X2CRM Open Source Edition is a customer relationship management program developed by
 * X2Engine, Inc. Copyright (C) 2011-2013 X2Engine Inc.
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY X2ENGINE, X2ENGINE DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 * 
 * You can contact X2Engine, Inc. P.O. Box 66752, Scotts Valley,
 * California 95067, USA. or at email address contact@x2engine.com.
 * 
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 * 
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * X2Engine" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by X2Engine".
 *****************************************************************************************/

Yii::app()->clientScript->registerCss('login',"

.avatar-upload {
    -webkit-border-radius:8px;
    -moz-border-radius:8px;
    -o-border-radius:8px;
    border-radius:8px;
}

#full-name {
    color: gray;
    font-weight: bold;
    font-size: 23px;
}

#login-page.welcome-back-page {
	width:490px !important;
}

#login-page.welcome-back-page #login-logo {
    margin-top: 11px;
}

#login-page.welcome-back-page .form-cell {
    height: 154px;
}

.avatar-cell {
    width: 130px;
    margin: 0;
    height: 124px;
    display: table-cell;
    float: left;
    text-align: center;
}

.image-alignment-helper {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}

#avatar-image {
    vertical-align: middle;
}

#login-page {
	width:360px;
	border:1px solid #e6e6e6;
	/* background:url(../images/login_stripes.png) center 50px no-repeat; */
	/* background:#eaeaea; */
	background:#eee;
	/* background-color:#87a155;
	background-color:rgba(255,255,255,0.25); */
	min-height:0;
	/* position:relative; */
	top:40%;
	margin:-130px auto 0 auto;
	padding:20px;
	position:relative;
	/* border:1px solid rgba(0,0,0,0.25); */
	border-radius:6px;
	-moz-border-radius:6px;
	-webkit-border-radius:6px;
	-o-border-radius:6px;
/* 	-moz-box-shadow:	0 3px 10px rgba(0,0,0,0.25);
	-webkit-box-shadow:	0 3px 10px rgba(0,0,0,0.25);
	box-shadow:			0 3px 10px rgba(0,0,0,0.25); */
}

#login-box{
	width:auto;
	/* padding-bottom:5px; */
}

#login-logo {
	/* display:block; */
	/* float:left; */
	margin:22px 10px 0 -5px;
}

#login-box h2 {
	font-size:16px;
	font-family:Georgia;
	margin-bottom:10px;
	/* margin-left:-20px; */
}

#login-form {
	/* background: #f0f0f0; */ /* Old browsers */
	/* background: -moz-linear-gradient(top, #f0f0f0 0%, #dddddd 100%); */ /* FF3.6+ */
	/* background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f0f0f0), color-stop(100%,#dddddd)); */ /* Chrome,Safari4+ */
	/* background: -webkit-linear-gradient(top, #f0f0f0 0%,#dddddd 100%); */ /* Chrome10+,Safari5.1+ */
	/* background: -o-linear-gradient(top, #f0f0f0 0%,#dddddd 100%); */ /* Opera 11.10+ */
	/* background: -ms-linear-gradient(top, #f0f0f0 0%,#dddddd 100%); */ /* IE10+ */
	/* background: linear-gradient(to bottom, #f0f0f0 0%,#dddddd 100%); */ /* W3C */
	/* filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0f0f0', endColorstr='#dddddd',GradientType=0 ); */ /* IE6-9 */
	
	background:none;
	margin-bottom:0;
	padding:10px 20px;
	border:none;
	overflow:hidden;
	/* border:1px solid #ccc; */
	border:none;
	border-bottom:1px solid #aaa;
	-moz-border-radius:		0;
	-o-border-radius:		0;
	-webkit-border-radius:	0;
/* 	border-radius:			4px;
	-moz-box-shadow:	inset 0 1px 2px rgba(0,0,0,0.6);
	-webkit-box-shadow:	inset 0 1px 2px rgba(0,0,0,0.6);
	box-shadow:			inset 0 1px 2px rgba(0,0,0,0.6); */
	/* border:1px solid #ddd; */
	/* border-color:rgba(0,0,0,0.2); */
}

#login-form .cell.right {
	float:right;
	margin-right:0;
	width:auto;
}

#login-form .row {
	overflow:visible; 
}

#login-form label {
	font-weight:bold;
	font-size:12px;
	color:#777;
}

#login-form input:focus {
	border-color:#aaa;
}

#login-form #google-icon {
	height:16px;
	width:16px;
	vertical-align:top;
	margin-top:-1px;
}

#login-form #mobile-icon {
	margin-left:10px;
	height:18px;
	width:18px;
	vertical-align:top;
	margin-top:-2px;
}

#LoginForm_username, #LoginForm_password {
	width:200px;
	color: #444;
	font-size:16px;
	line-height:24px;
	vertical-align:center;
	font-weight: bold;
	-moz-box-shadow:	inset 0 1px 3px rgba(0,0,0,0.25);
	-webkit-box-shadow:	inset 0 1px 3px rgba(0,0,0,0.25);
	box-shadow:			inset 0 1px 3px rgba(0,0,0,0.25);
}

#LoginForm_rememberMe {
	/*margin-left:10px; 
	margin-top:10px; */
	border:none !important;
	width: 13px;
	height: 13px;
	padding: 0;
	margin:0;
	vertical-align: bottom;
	position: relative;
	*overflow: hidden;
}

#login-form input.x2-button {
	padding: 10px 25px;	/* extra big! */
	float:left;
	border:1px solid #3173CC;
	-moz-box-shadow:	none;
	-webkit-box-shadow:	none;
	box-shadow:			none;
	color:#fff;
	
	text-shadow: none !important;

	background: #417dcd; /* Old browsers */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#417dcd', endColorstr='#3d70b4',GradientType=0 ); /* IE6-8 */
	/* border:none; */
}

#login-form input.x2-button:hover {
	background: #488fe2; /* Old browsers */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#488fe2', endColorstr='#4380cc',GradientType=0 ); /* IE6-9 */
}

#login-form input.x2-button:active {
	
	-moz-box-shadow:	inset 0 1px 3px rgba(0,0,0,0.25);
	-webkit-box-shadow:	inset 0 1px 3px rgba(0,0,0,0.25);
	box-shadow:			inset 0 1px 3px rgba(0,0,0,0.25);
	background: #3d70b4; /* Old browsers */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3d70b4', endColorstr='#417dcd',GradientType=0 ); /* IE6-9 */
}

#login-form #login-links a {
    opacity:0.5;
}

#login-form #login-links a:hover {
    opacity:1;
}

#login-form a.x2touch-link {
    display:inline-block;margin-top:5px;font-size:10px;text-decoration:none;color:#666;
}

#login-form a.x2touch-link:hover {
    text-decoration:underline;
}

#login-form a.x2touch-link img {
    vertical-align:top;
}

#login-version, #login-x2engine {
	display:block;
	margin:0;
	text-align:center;
	font-weight:bold;
	font-size:10px;
	color:#999;
    margin-top:5px;
	margin-bottom:-15px;
	text-decoration:none;
}

#login-x2engine a{
	color:#999;
    margin-top:0;
}
#login-x2engine a:hover {
	text-decoration:underline;
}

.form-cell {
    margin: 0;
    width: 225px;
}

.captha-row {
    margin-top: 5px;
}

.login-button-row {
    margin-top: 5px;
}

.login-button-row .remember-me-cell {
    margin-left:10px;
    padding-top:12px;
    padding-left:5px;
}

#login-links {
	 margin-top:10px;
     text-align:center;
}

");

$this->pageTitle=Yii::app()->name . ' - Login';

$hasProfile = false;
if(isset($_COOKIE['LoginForm'])) {
    $model->setAttributes($_COOKIE['LoginForm']);
    if (is_array ($_COOKIE['LoginForm']) &&
        in_array ('username', array_keys ($_COOKIE['LoginForm']))) {

        $username = $_COOKIE['LoginForm']['username'];
        $profile = Profile::model ()->findByAttributes (array (
            'username' => $username
        ));
        if ($profile) {
            $profileId = $profile->id;
            $fullName = $profile->fullName;
            $hasProfile = true;
        } 
    }
}

Yii::app()->clientScript->registerScript('loginFocus',
	'document.getElementById("LoginForm_username").focus ();', // for when autofocus isn't supported
CClientScript::POS_READY);
?>
<div class="container<?php echo (isset ($profileId) ? ' welcome-back-page' : ''); ?>" id="login-page">
<div id="login-box">
<?php $form=$this->beginWidget('CActiveForm', array(
	// 'id'=>'login-form',
	'enableClientValidation'=>false,
	'enableAjaxValidation'=>false,
	'clientOptions'=>array(
		'validateOnSubmit'=>false,
	),
));
	?><!--<h2><?php echo Yii::t('app','Welcome to {appName}.',array('{appName}'=>Yii::app()->name)); ?></h2>-->
<div class="form" id="login-form">
	<div class="row">
		<div class="cell company-logo-cell">
			<?php echo CHtml::image(Yii::app()->baseUrl.'/images/x2engine_crm_login.png','X2Engine',array('id'=>'login-logo','width'=>80,'height'=>71)); ?>
		</div>
		<div class="cell form-cell">
		
			<?php 
            if ($hasProfile) { 
            ?>
            <div id='full-name'><?php echo $fullName; ?></div>
            <?php
            }
            echo $form->label($model,'username', array ('style' => ($hasProfile ? 'display: none;' : '')));
            if ($hasProfile) { 
			    echo $form->hiddenField($model,'username');
            } else {
			    echo $form->textField($model,'username',array('autofocus'=>'autofocus'));
            }
			
            echo $form->label($model,'password',array('style'=>'margin-top:5px;')); 
			echo $form->passwordField($model,'password'); 
			echo $form->error($model,'password'); 

			if($model->useCaptcha && CCaptcha::checkRequirements()) { 
            ?>
			<div class="row captha-row">
				<?php
				echo '<div>';
				$this->widget('CCaptcha',array(
					'clickableImage'=>true,
					'showRefreshButton'=>false,
					'imageOptions'=>array(
						'style'=>'display:block;cursor:pointer;',
						'title'=>Yii::t('app','Click to get a new image')
					)
				)); echo '</div>';
				echo '<p class="hint">'.Yii::t('app','Please enter the letters in the image above.').'</p>';
				echo $form->textField($model,'verifyCode');
				?>
			</div><?php } ?>
			<div class="row checkbox login-button-row">
				<div class="cell">
					<?php echo CHtml::submitButton(Yii::t('app','Login'),array('class'=>'x2-button')); ?>
				</div>

				<div class="cell remember-me-cell">
					<?php echo $form->checkBox($model,'rememberMe',array('value'=>'1','uncheckedValue'=>'0')); ?>
					<?php echo $form->label($model,'rememberMe',array('style'=>'font-size:10px;')); ?>
					<?php echo $form->error($model,'rememberMe'); ?><br>
					
				</div>		
			</div>
		</div>
        <?php
        if (isset ($profileId)) {
        ?>
        <div class='avatar-cell'>
            <span class='image-alignment-helper'></span>
            <?php Profile::renderFullSizeAvatar ($profileId, 105); ?>
        </div>
        <?php
        }
        ?>
	</div>
	<div class="row" id="login-links">
		<?php echo CHtml::link('<img src="'.Yii::app()->baseUrl.'/images/google_icon.png" id="google-icon" /> '.Yii::t('app','Login with Google'),
				(@$_SERVER['HTTPS'] == 'on' ? 'https://' : 'http://') . 
				((substr($_SERVER['HTTP_HOST'],0,4)=='www.')?substr($_SERVER['HTTP_HOST'],4):$_SERVER['HTTP_HOST']) . 
				$this->createUrl('/site/googleLogin'),array('class'=>'x2touch-link')); ?>
		<?php echo CHtml::link('<img src="'.Yii::app()->baseUrl.'/images/mobile.png" id="mobile-icon" /> X2Touch Mobile',Yii::app()->getBaseUrl() . '/index.php/mobile/site/login',array('class'=>'x2touch-link')); ?>
	</div>
</div>
<!--<div id="login-logo"></div>-->
<?php $this->endWidget(); ?>
</div>

<span id="login-version"><?php echo Yii::app()->params->edition=='pro'? 'PROFESSIONAL EDITION' : 'OPEN SOURCE EDITION'; ?>, VERSION <?php echo Yii::app()->params->version; ?> </span>
<br>
<span id="login-x2engine">
    <a href="http://www.x2engine.com">X2Engine, Inc.</a><?php 
    if(Yii::app()->params->admin->edition == 'opensource'){
        echo '&nbsp;&bull;&nbsp;'.CHtml::link("LICENSE",Yii::app()->baseUrl.'/LICENSE.txt');
    } ?></span>
</div>
