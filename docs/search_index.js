var documenterSearchIndex = {"docs":
[{"location":"guide/#Guide","page":"Guide","title":"Guide","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"Documentation may not be accurate as this is a beta stage package undergoing changes. Get started with tutorials which are more up to date.","category":"page"},{"location":"guide/#Scalar-and-vector-fields","page":"Guide","title":"Scalar & vector fields","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"Scalar & vector fields are represented as 2d/3d arrays of canonically scalars or vectors. Array values can alternatively be any type that Supports addition & multiplication.","category":"page"},{"location":"guide/#Customizable-grid","page":"Guide","title":"Customizable grid","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"Grid","category":"page"},{"location":"guide/#Main.EquivariantOperators.Grid","page":"Guide","title":"Main.EquivariantOperators.Grid","text":"Grid(cell, rmax::AbstractFloat)\nGrid(\n    cell::AbstractMatrix,\n    sz::Union{AbstractVector,Tuple};\n    origin = (sz .+ 1) ./ 2,\n    )\n\nGrid is specified by its discrete cell vectors (column-wise matrix), overall size and origin. For a uniform Cartesian 5x5 grid discretized at 0.1 with a centered origin, we get cell = [0.1 0; 0 0.1] & origin = [3, 3]. Grid cell can in general be noncartesian.\n\n\n\n\n\n","category":"type"},{"location":"guide/#Particle-mesh-placement-and-interpolation","page":"Guide","title":"Particle mesh placement and interpolation","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"get(::AbstractArray, ::Grid, ::AbstractVector)","category":"page"},{"location":"guide/#Base.get-Tuple{AbstractArray, Grid, AbstractVector}","page":"Guide","title":"Base.get","text":"Base.get(field::AbstractArray, grid::Grid, rvec::AbstractVector)\nBase.put!(\n    field::AbstractArray,\n    grid::Grid,\n    rvec::AbstractVector,\n    val::AbstractVector,\n)\n\nWith grid info we can interpolate a scalar or vector field at any location. We can also place a scalar or vector point source anywhere with automatic normalization wrt discretization. Both work via a proximity weighted average of the closest grid points (in general up to 4 in 2d and 8 in 3d).\n\n\n\n\n\n","category":"method"},{"location":"guide/#Finite-difference-equivariant-operators","page":"Guide","title":"Finite difference equivariant operators","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"Op\r\nDel\r\nLaplacian\r\nGaussian","category":"page"},{"location":"guide/#Main.EquivariantOperators.Op","page":"Guide","title":"Main.EquivariantOperators.Op","text":"Op(radfunc, rmax, cell::Matrix; kw...)\n\nconstructs equivariant operator\n\n\n\n\n\nfunction (m::Op)(x::AbstractArray, )\n\n\n\n\n\n","category":"type"},{"location":"guide/#Main.EquivariantOperators.Del","page":"Guide","title":"Main.EquivariantOperators.Del","text":"\"     Del(cell; pad = :same, border = :smooth)\n\nconstructs gradient operator\n\n\n\n\n\n","category":"function"},{"location":"guide/#Main.EquivariantOperators.Laplacian","page":"Guide","title":"Main.EquivariantOperators.Laplacian","text":"Laplacian(cell; pad = :same, border = :smooth)\n\nconstructs Laplacian operator\n\n\n\n\n\n","category":"function"},{"location":"guide/#Main.EquivariantOperators.Gaussian","page":"Guide","title":"Main.EquivariantOperators.Gaussian","text":"Gaussian(cell, σ, rmax; kw...)\n\nconstructs Gaussian diffusion operator\n\n\n\n\n\n","category":"function"},{"location":"guide/#Lower-level-utilities","page":"Guide","title":"Lower level utilities","text":"","category":"section"},{"location":"guide/#Convolutions","page":"Guide","title":"Convolutions","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"Feature rich convolution and cross correlation functions with options for padding, stride, boundary conditions, and custom products (tensor field convolutions).","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"cvconv\r\ndspconv","category":"page"},{"location":"guide/#Main.EquivariantOperators.cvconv","page":"Guide","title":"Main.EquivariantOperators.cvconv","text":"cvconv(x, f; product = *, stride = 1, pad = 0)\n\n\"convolution\" in computer vision for any dimension, same as Cross correlation. For convolution in signal processing , use dspconv instead.\n\nx input array f filter array product product in convolution, eg *, dot pad amount of padding or padding option\n\nany integer number of pixels on each boundary\n:same: adds enough padding so output is same size as input\n:outer: output size is size(x) .+ size(f) .- 1\n\nborder type of padding\n\n0 value pixels\n:replicate repeats edge values\n:circular periodic BC\n:smooth continuous derivatives at boundaries useful for differential operators\n:reflect reflects interior across boundaries which are not repeated\n:symmetric same as :reflect but with boundaries repeated\n\nConvolutions in other Julia packages, fewer features but perhaps more optimized for speed in their specific use cases\n\nImageFiltering.imfilter. Its docs has excellent mathematical explaination of convolutions and correlation as well as padding/border options\nDSP.conv DSP.xcor\nFlux.conv\n\n\n\n\n\n","category":"function"},{"location":"guide/#Main.EquivariantOperators.dspconv","page":"Guide","title":"Main.EquivariantOperators.dspconv","text":"dspconv(x, f; product = *,pad = :outer,border=0)\n\nConvolution in signal processing. For \"convolution\" in computer vision, use cvconv instead. By default output size is size(x) .+ size(f) .- 1. See cvconv for its keyword options which also apply here\n\n\n\n\n\n","category":"function"},{"location":"#Home","page":"Home","title":"Home","text":"","category":"section"},{"location":"#Synopsis","page":"Home","title":"Synopsis","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"EquivariantOperators.jl implements in Julia fully differentiable finite difference operators on scalar or vector fields in 2d/3d. It can run forwards for PDE simulation or image processing, or back propagated for machine learning or inverse problems. Emphasis is on symmetry preserving rotation equivariant operators, including differential operators, common Green's functions & parametrized neural operators. Supports possibly nonuniform, nonorthogonal or periodic grids.","category":"page"},{"location":"#Tutorials","page":"Home","title":"Tutorials","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Hosted on Colab notebooks","category":"page"},{"location":"#Theory","page":"Home","title":"Theory","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Equivariant linear operators are our building blocks. Equivariance means a rotation of the input results in the same rotation of the output thus preserving symmetry. Applying a linear operator convolves the input with the operator's kernel. If the operator is also equivariant, then its kernel must be radially symmetric. Differential operators and Green's functions are in fact equivariant linear operators. We provide built in constructors for these common operators. By parameterizing the radial function, we can also construct custom neural equivariant operators for machine learning.","category":"page"},{"location":"#Publications","page":"Home","title":"Publications","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Preprint: Paul Shen, Michael Herbst, Venkat Viswanathan. Rotation Equivariant  Operators for Machine Learning on Scalar Fields and Vector Fields. Arxiv. 2022.","category":"page"},{"location":"#Contributors","page":"Home","title":"Contributors","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Lead developer: Paul Shen (xingpins@andrew.cmu.edu), Michael Herbst (herbst@acom.rwth-aachen.de)   PI: Venkat Viswanathan (venkatv@andrew.cmu.edu)","category":"page"},{"location":"","page":"Home","title":"Home","text":"In collaboration with Julia Computing","category":"page"}]
}
