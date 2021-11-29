var documenterSearchIndex = {"docs":
[{"location":"tutorials/#Tutorials","page":"Tutorials","title":"Tutorials","text":"","category":"section"},{"location":"tutorials/","page":"Tutorials","title":"Tutorials","text":"Machine learning, finite difference, and particle mesh for electrostatics and electronic density calculation and prediction","category":"page"},{"location":"tutorials/","page":"Tutorials","title":"Tutorials","text":"Coming soon to Google Colab!","category":"page"},{"location":"publications/#Publications","page":"Publications","title":"Publications","text":"","category":"section"},{"location":"publications/","page":"Publications","title":"Publications","text":"Preprint: Paul Shen, Michael Herbst, Venkat Viswanathan. Rotation Equivariant Fourier Neural Operators for Learning Symmetry Preserving Transformations on Scalar Fields, Vector Fields, and Higher Order Tensor Fields. Arxiv. 2021.","category":"page"},{"location":"architecture/#Architecture","page":"Architecture","title":"Architecture","text":"","category":"section"},{"location":"architecture/#Tensor-fields-over-grid","page":"Architecture","title":"Tensor fields over grid","text":"","category":"section"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"Tensor fields are represented as 3d/4d arrays for 2d/3d uniform Cartesian grids with the last dimension for the field component. For example, a 3d vector field would be sized XxYxZx3 and while a 2d scalar field would be XxYx1.","category":"page"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"We store grid information including resolution, size and origin in Grid. By default, the origin indices are centered in the grid. Julia is 1-indexed, so the origin of a 3x3x3 grid defaults to [2, 2, 2].","category":"page"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"Grid","category":"page"},{"location":"architecture/#Main.EquivariantOperators.Grid","page":"Architecture","title":"Main.EquivariantOperators.Grid","text":"Grid(dx::AbstractFloat, rmax::AbstractFloat; dims = 3, rank_max = 1)\n\n\n\n\n\nGrid(\ndx::AbstractFloat,\nsz::Union{AbstractVector,Tuple};\norigin = nothing,\nrank_max = 1)\n\n\n\n\n\n","category":"type"},{"location":"architecture/#Tensor-field-products-and-operations","page":"Architecture","title":"Tensor field products and operations","text":"","category":"section"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"All Arrays operations (eg +, -, abs) apply to fields. Local pointwise products however depend on the ranks of input fields and output field. field_prod infers the appropriate pointwise product (eg scalar, dot, cross, matrix vector) from the ranks. For example, locally multiplying two vector fields into a scalar field (ranks 1, 1 -> 0) involves the dot product. We also provide convenience functions for retrieving or computing the pointwise norm and rank.","category":"page"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"field_prod\r\nfield_norm\r\nfield_rank","category":"page"},{"location":"architecture/#Main.EquivariantOperators.field_prod","page":"Architecture","title":"Main.EquivariantOperators.field_prod","text":"field_prod(x::AbstractArray, y::AbstractArray; rank = nothing)\n\n\n\n\n\n","category":"function"},{"location":"architecture/#Main.EquivariantOperators.field_norm","page":"Architecture","title":"Main.EquivariantOperators.field_norm","text":"function field_norm(field::AbstractArray)\n\n\n\n\n\n","category":"function"},{"location":"architecture/#Main.EquivariantOperators.field_rank","page":"Architecture","title":"Main.EquivariantOperators.field_rank","text":"field_rank(x::AbstractArray)\n\n\n\n\n\n","category":"function"},{"location":"architecture/#Particle-mesh-placement-and-interpolation","page":"Architecture","title":"Particle mesh placement and interpolation","text":"","category":"section"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"With grid info we can interpolate a tensor field at any location. We can also place a point tensor source (eg scalar particle) anywhere. This particle mesh placement applies integral normalization, so the array value is scaled by 1/dV (or 1/dA). Both work via a proximity weighted average of the closest lattice points (in general up to 4 in 2d and 8 in 3d).","category":"page"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"field::AbstractArray\r\nput_point_source!","category":"page"},{"location":"architecture/#Linear-operators","page":"Architecture","title":"Linear operators","text":"","category":"section"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"LinearOperator constructs functions for common differential operators and Green's functions. operators diverging at 0 are zeroed out within rmin. Any custom equivariant operator can also be made by specifying its radial function and ranks of the input output fields.","category":"page"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"Under the hood, we implement all linear operators as tensor field convolutions between the input field and the impulse response field of the operator. We compute the kernel field as a product of the radial function and the appropriate spherical harmonic tensor. The operator's kernel field has a Grid with origin centered on a lattice point. The output field's components are truncated to have same size and Grid as those of input.","category":"page"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"Long ranged convolutions are automatically computed in Fourier space by dependency DSP.jl","category":"page"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"LinearOperator","category":"page"},{"location":"architecture/#Main.EquivariantOperators.LinearOperator","page":"Architecture","title":"Main.EquivariantOperators.LinearOperator","text":"function LinearOperator(\n    name;\n    dx = nothing,\n    rmax = nothing,\n    ranks = nothing,\n    grid = nothing,\n    dims = 3,\n    radfunc = nothing,\n    rmin = 0.0,\n    σ = 1.0\n)\n\n\n\n\n\nfunction (m::LinearOperator)(x::AbstractArray, grid::Grid)\n\n\n\n\n\n","category":"type"},{"location":"architecture/#Machine-learning","page":"Architecture","title":"Machine learning","text":"","category":"section"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"We can learn rotation equivariant mappings between sets of scalar, vector and tensor fields. EquivLayer constructs neural network layers compatible with Julia's machine learning library Flux.jl.","category":"page"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"...","category":"page"},{"location":"architecture/","page":"Architecture","title":"Architecture","text":"EquivLayer","category":"page"},{"location":"architecture/#Main.EquivariantOperators.EquivLayer","page":"Architecture","title":"Main.EquivariantOperators.EquivLayer","text":"function EquivLayer(\n    name,\n    inranks,\n    outranks;\n    dims = 3,\n    dx = 1.0,\n    rmax = 1.0,\n    rank_max = max(1, inranks..., outranks...),\n    σ = identity\n)\n\n\n\n\n\n\n\n\n\n","category":"type"},{"location":"#Home","page":"Home","title":"Home","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"note: Note\nDocumentation website under construction. Expected release of code base in early December 2021.","category":"page"},{"location":"#Synopsis","page":"Home","title":"Synopsis","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"EquivariantOperators.jl is a Julia package implementing equivariant machine learning, finite difference operators and particle mesh methods on scalar, vector and tensor fields over uniform grids. It's a fully differentiable finite differences operator engine that can run forward for calculation or backwards for machine learning and inverse problems. Emphasis is on rotation equivariant operators which consequently preserve symmetry. This includes common differential operators (eg div, curl, Laplacian), Green's functions (eg inverse-square fields, Gaussians, Stokeslet), and parametrized equivariant neural operators. Tensor fields are represented as multidim arrays supporting particle mesh methods of interpolation and point source placement. Operators are implemented as tensor field convolutions in real or Fourier space using rank appropriate products (eg scalar, dot, cross). For machine learning, we provide tensor convolution, product and nonlinear scaling layers for inferring equivariant mappings between arbitrary sets of tensor fields.","category":"page"},{"location":"#Use-cases","page":"Home","title":"Use cases","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Machine learning rotation equivariant and symmetry preserving behavior of dynamical systems and solutions to PDEs\nSolving inverse problems via adjoint methods\nApplying finite difference differential operators (eg grad, div) and Green's functions (eg inverse-square fields, Gaussians, Stokeslet) on images and vector fields\nParticle mesh point source placement, interpolation, and Fourier space field calculations","category":"page"},{"location":"","page":"Home","title":"Home","text":"Check out our tutorials on Google Colab and our Arxiv preprint!","category":"page"},{"location":"#Contributors","page":"Home","title":"Contributors","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Paul Shen <xingpins@andrew.cmu.edu>, Michael Herbst <herbst@acom.rwth-aachen.de>, PI: Venkat Viswanathan <venkatv@andrew.cmu.edu>","category":"page"},{"location":"","page":"Home","title":"Home","text":"In consultation with Rachel Kurchin, Dhairya Gandhi, Chris Rackauckas","category":"page"},{"location":"","page":"Home","title":"Home","text":"In collaboration with Julia Computing","category":"page"}]
}
