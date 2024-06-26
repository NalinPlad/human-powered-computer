	.section	__TEXT,__text,regular,pure_instructions
	.build_version macos, 14, 0	sdk_version 14, 5
	.intel_syntax noprefix
	.globl	_magic                          ## -- Begin function magic
	.p2align	4, 0x90
_magic:                                 ## @magic
	.cfi_startproc
## %bb.0:
	push	rbp
	.cfi_def_cfa_offset 16
	.cfi_offset rbp, -16
	mov	rbp, rsp
	.cfi_def_cfa_register rbp
	mov	dword ptr [rbp - 4], edi
	mov	dword ptr [rbp - 8], esi
	mov	eax, dword ptr [rbp - 4]
	imul	eax, dword ptr [rbp - 8]
	add	eax, 13
	pop	rbp
	ret
	.cfi_endproc
                                        ## -- End function
	.globl	_test                           ## -- Begin function test
	.p2align	4, 0x90
_test:                                  ## @test
	.cfi_startproc
## %bb.0:
	push	rbp
	.cfi_def_cfa_offset 16
	.cfi_offset rbp, -16
	mov	rbp, rsp
	.cfi_def_cfa_register rbp
	mov	dword ptr [rbp - 4], edi
	mov	dword ptr [rbp - 8], esi
	mov	eax, dword ptr [rbp - 4]
	cdq
	idiv	dword ptr [rbp - 8]
	sub	eax, 12
	pop	rbp
	ret
	.cfi_endproc
                                        ## -- End function
	.globl	_main                           ## -- Begin function main
	.p2align	4, 0x90
_main:                                  ## @main
	.cfi_startproc
## %bb.0:
	push	rbp
	.cfi_def_cfa_offset 16
	.cfi_offset rbp, -16
	mov	rbp, rsp
	.cfi_def_cfa_register rbp
	sub	rsp, 16
	mov	dword ptr [rbp - 4], 0
	mov	dword ptr [rbp - 8], 25
	mov	dword ptr [rbp - 12], 13
	mov	edi, dword ptr [rbp - 8]
	mov	esi, dword ptr [rbp - 12]
	call	_magic
	add	rsp, 16
	pop	rbp
	ret
	.cfi_endproc
                                        ## -- End function
.subsections_via_symbols
