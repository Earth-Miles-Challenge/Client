import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FormField, Fieldset } from 'components';

export const RegistrationForm = props => {
	const { profile = {}, onChange, onContinue } = props;
	const { t } = useTranslation();
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = data => onContinue();
	const handleChange = (field, event) => onChange(field, event.target.value);

	const displayErrors = (errors, field) => {
		const MESSAGES = {
			'firstName': t("registrationPage.registrationForm.notices.firstNameRequired"),
			'lastName': t("registrationPage.registrationForm.notices.lastNameRequired"),
			'email': {
				'required': t("registrationPage.registrationForm.notices.emailRequired"),
				'pattern': t("registrationPage.registrationForm.notices.emailInvalid")
			},
			'password': {
				'required': t("registrationPage.registrationForm.notices.passwordRequired")
			}
		}

		return errors[field] && <p className="error">{MESSAGES[field][errors[field].type] || MESSAGES[field]}</p>;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Fieldset legend={t('registrationPage.registrationForm.fieldLabels.name')}>
				<FormField label={t('registrationPage.registrationForm.fieldLabels.firstName')} id="firstName">
					<input type="text"
						id="firstName"
						{...register('firstName', {
							required: true,
							value: profile.first_name,
							onChange: event => handleChange('first_name', event)
						} ) }
						aria-invalid={errors.firstName ? true : false}
					/>
					{displayErrors(errors, 'firstName')}
				</FormField>
				<FormField label={t('registrationPage.registrationForm.fieldLabels.lastName')} id="lastName">
					<input type="text"
						id="lastName"
						{...register('lastName', {
							required: true,
							value: profile.last_name,
							onChange: event => handleChange('last_name', event)
						} ) }
						aria-invalid={errors.lastName ? true : false}
					/>
					{displayErrors(errors, 'lastName')}
				</FormField>
			</Fieldset>
			<FormField label={t('registrationPage.registrationForm.fieldLabels.email')} id="email">
				<input type="email"
					id="email"
					{...register('email', {
						pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						required: true,
						value: profile.email,
						onChange: event => handleChange('email', event)
					} ) }
					aria-invalid={errors.email ? true : false}
				/>
				{displayErrors(errors, 'email')}
			</FormField>
			<FormField label={t('registrationPage.registrationForm.fieldLabels.password')} id="password">
				<input type="password"
					id="password"
					{...register('password', {
						pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						required: true,
						value: profile.password,
						onChange: event => handleChange('password', event)
					} ) }
					aria-invalid={errors.password ? true : false}
				/>
				{displayErrors(errors, 'password')}
			</FormField>
			<FormField label={t('registrationPage.registrationForm.fieldLabels.passwordRepeat')} id="password">
				<input type="password"
					id="password-repeat"
					{...register('password-repeat', {
						pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						required: true,
						value: profile.password,
						onChange: event => handleChange('password-repeat', event)
					} ) }
					aria-invalid={errors.passwordRepeat ? true : false}
				/>
				{displayErrors(errors, 'password-repeat')}
			</FormField>
			<input type="submit" value={t('registrationPage.registrationForm.button')} />
		</form>
	)
}
