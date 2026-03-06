import { useSearchParams, Link } from "react-router";
import { Search as SearchIcon, ArrowLeft, Filter, SlidersHorizontal } from "lucide-react";
import { SearchResults } from "./SearchResults";
import { searchCompanyKnowledge } from "../data/mockData";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export function ResultsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("q") || "";
    const [inputValue, setInputValue] = useState(queryParam);
    const results = searchCompanyKnowledge(queryParam);

    useEffect(() => {
        setInputValue(queryParam);
    }, [queryParam]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setSearchParams({ q: inputValue });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Search Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4">
                <div className="max-w-6xl mx-auto flex items-center gap-6">
                    <Link to="/" className="text-gray-500 hover:text-gray-700">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>

                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            placeholder="Buscar contenido corporativo..."
                        />
                    </form>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Filtros
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <SlidersHorizontal className="w-4 h-4" />
                            Avanzado
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 py-8">
                <SearchResults results={results} query={queryParam} />
            </div>
        </div>
    );
}
