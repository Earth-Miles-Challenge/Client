import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StravaConnectButton, ProfileForm, selectSignUpFormActiveStep } from 'features/users';
import { FormProgressBar } from 'components';

export const SignUpPage = () => {
	const { t } = useTranslation('main');
	const activeStep = useSelector(selectSignUpFormActiveStep);

	const STEPS = [
		t('signup.progress-bar-1'),
		t('signup.progress-bar-2'),
		t('signup.progress-bar-3')
	];

	// State
	// 1. If user has not connected Strava yet, that is step 1
	// 2. If user has connected Strava but has not yet created a challenge, display link to create a challenge
	// 3. If a user has already created a challenge, show details

	return (
		<div className="form-container">
			<h1>{t('signup.top-header')}</h1>
			<FormProgressBar steps={STEPS} activeStep={activeStep} />
			{
				activeStep === t('signup.progress-bar-1') &&
				<div className="strava-connect-wrapper">
					<StravaConnectButton />
				</div>
			}
			{
				activeStep === t('signup.progress-bar-2') &&
				<div className="profile-form-wrapper">
					<ProfileForm />
				</div>
			}
			{
				activeStep === t('signup.progress-bar-3') &&
				<div className="emissions-savings-wrapper">
				</div>
			}
		</div>
	)
}