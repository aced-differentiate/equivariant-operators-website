using Zygote: @adjoint
# using Zygote
# using ForwardDiff
#
# val(x::ForwardDiff.Dual) = ForwardDiff.value(x)
# val(x::Float64) = x
# val(x::Float32) = x
val=identity

function dconv(x, a, b;kw...)
    size=Base.size
    n = length(size(a))
    x = reshape(vec(x), (size(a) .+ size(b) .- ones(Int, n))...)
    r = (
        dspconv(x, reverse(b);kw...)[(
            # DSP.xcorr(x, b, padmode = :none)[(
            i:j for (i, j) in zip(size(b), size(x))
        )...],
        dspconv(x, reverse(a);kw...)[(
            # DSP.xcorr(x, a, padmode = :none)[(
            i:j for (i, j) in zip(size(a), size(x))
        )...],
    )
    return r
end
# @adjoint dspconv(a, b) = dspconv(a, b), x -> dconv(x, a, b)
@adjoint dspconv(a, b;kw...) = dspconv(val.(a), val.(b);kw...),
x -> dconv(val.(x), val.(a), val.(b);kw...)
