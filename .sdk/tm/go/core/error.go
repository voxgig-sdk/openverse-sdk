package core

type OpenverseError struct {
	IsOpenverseError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOpenverseError(code string, msg string, ctx *Context) *OpenverseError {
	return &OpenverseError{
		IsOpenverseError: true,
		Sdk:              "Openverse",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OpenverseError) Error() string {
	return e.Msg
}
