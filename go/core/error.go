package core

type StarWarsDatabankError struct {
	IsStarWarsDatabankError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewStarWarsDatabankError(code string, msg string, ctx *Context) *StarWarsDatabankError {
	return &StarWarsDatabankError{
		IsStarWarsDatabankError: true,
		Sdk:              "StarWarsDatabank",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *StarWarsDatabankError) Error() string {
	return e.Msg
}
