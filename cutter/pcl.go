package cutter

type AudioInfo struct {
	pcl []int
}

func NewAudioInfo() *AudioInfo {
	ai := &AudioInfo{}

	return ai
}

func (ai *AudioInfo) Pcl() {
	return ai.pcl
}
