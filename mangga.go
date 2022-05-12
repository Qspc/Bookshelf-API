type User struct {
	ID   string `json:"id"`
	NoHP string `json:"noHP"`
	Email string `json:"email"`
	NamaLengkap 	string `json:"namaLengkap"`

	Username	string `json:"username"`
	Password 	string `json:"password"`

	TanggalLahir  	string	`json:"tanggalLahir"`
	NIK 	int64 	`json:"nik"`
	Role 	int64 	`json:"role"`

}

// Bawang struct
type Bawang struct {
	ID 				string `json:"id"` // for query
	BenihID 	string `json:"benihID"`
	ManggaID 	string `json:"manggaID"`

	NamaPengirim	string `json:"namaPengirim"`
	AlamatPengirim   string `json:"alamatPengirim"`
	KontakPengirim   string `json:"kontakPengirim"`
	NamaPenerima	string `json:"namaPenerima"`
	AlamatPenerima   string `json:"alamatPenerima"`
	KontakPenerima   string `json:"kontakPenerima"`

	KuantitasBenihKg 	float64 `json:"kuantitasBenihKg"`
	HargaBenihPerKg  	float64 `json:"hargaBenihPerKg"`
	HargaBenihTotal		float64	`json:"hargaBenihTotal"`

	KuantitasManggaKg 	float64 `json:"kuantitasManggaKg"`
	HargaManggaPerKg  	float64 `json:"hargaManggaPerKg"`
	HargaManggaTotal	float64	`json:"hargaManggaTotal"`

	TanggalTransaksi 	int64	`json:"tanggaltransaksi"`

	// Unique Value
	// From Penangkar
	VarietasBenih   string `json:"varietasBenih"`
	UmurBenih       string `json:"umurBenih"`
	UmurPanen       string `json:"umurPanen"`
	TanggalTanam	string `json:"tanggalTanam"`

	// From Petani
	Pupuk         	string 	`json:"pupuk"`
	Ukuran    	string 	`json:"ukuran"`
	Pestisida     	string 	`json:"pestisida"`
	KadarAir 	float64 `json:"kadarAir"`
	Perlakuan     	string 	`json:"perlakuan"`
	Produktivitas 	string 	`json:"produktivitas"`
	TanggalPanen 	int64 	`json:"tanggalPanen"`

	// From Pengumpul
	TanggalMasuk     int64 `json:"tanggalMasuk"`
	TeknikSorting    string `json:"teknikSorting"`
	MetodePengemasan string `json:"metodePengemasan"`

	//pedagang
	Pengangkutan string `json:"pengangkutan"`
	Pembeli		string `json:"pembeli"`

	CaraPembayaran strgin `json:"caraPembayaran"`
	TxID1 string `json:"txID1"` // penangkar - petani
	TxID2 string `json:"txID2"` // petani - pengumpul
	TxID3 string `json:"txID3"` // pengumpul - pedagang
	TxID4 string `json:"txID3"` // pedagang - konsumen

	IsAsset 	bool `json:"isAsset"`
	IsConfirmed bool `json:"isConfirmed"`
	IsEmpty		bool `json:"isEmpty"`
	IsRejected 	bool `json:"isRejected"`

	RejectReason	string	`json:"rejectReason"`
}
