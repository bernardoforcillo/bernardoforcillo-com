package main

import "testing"

func TestListenPort(t *testing.T) {
	tests := []struct {
		name string
		env  string
		want string
	}{
		{"defaults to 3000", "", "3000"},
		{"honours PORT", "8080", "8080"},
		{"passes through a port with a colon", ":9000", ":9000"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := listenPort(tt.env); got != tt.want {
				t.Fatalf("listenPort(%q) = %q, want %q", tt.env, got, tt.want)
			}
		})
	}
}
