DO $$
BEGIN
IF exists (select * from propertiesderivedfinancialdetails limit 1) THEN
ELSE
insert into propertiesderivedfinancialdetails
select id, (rental_income - operating_expenses) as cash_flow, ROUND(operating_expenses / rental_income, 2) as operating_expense_ratio from propertiesbasicgeneraldetails;
END IF;
END $$;