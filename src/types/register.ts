export type StepOne = {
    user_email: string
    user_password: string
    user_password_confirmation: string
    user_full_name: string
    user_phone: string
    user_position: string
    user_nationality: string
    user_status: string
    user_is_admin: string
}

export type StepTwo = {
    company_name: string
    company_address: string
    company_phone: string
    company_business_email: string
    company_country_id: string
    company_city_id: string
}

export type RegisterForm = {
    step1: StepOne,
    step2: StepTwo
}
